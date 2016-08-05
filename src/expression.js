// an expression is a representation of a value and can be a static value, or an evaluated value
//    constants - 'a string', 3, true, null
//    evaluated object -
//    variable - $VARIABLE_KEY
//    key path - path.to.key
//    function -
var ConstantExpression=require("./expression-types/constant-expression.js");
var EvaluatedObjectExpression=require("./expression-types/evaluated-object-expression.js");
var FunctionExpression=require("./expression-types/function-expression.js");
var KeyPathExpression=require("./expression-types/key-path-expression.js");
var VariableExpression=require("./expression-types/variable-expression.js");

(function(root){

   var _cache={};
   var _debug=false;

   function Expression(){};

   Expression.prototype.getDependentKeyPaths=function(){
      return [];
   };

   Expression.parse=function(s, a){

      var e;
      var isArray = (a && a.constructor===Array);
      var args = (a && isArray ? a : []);
      var vars = (a && isArray ? {} : a);
      var cacheable = true;

      typeof(s)==="number" && (s="" + s);

      if(typeof(s)==="string")
      {
         s=s.trim();

         if(s==="?" && args && args.length!==0) // formatter substitution
         {
            // console.log("args: ", args);
            s=args.shift();
         }

         // pull from cache
         e=_cache[s];

         if(!e)
         {
            if(typeof(s)==="string")
            {
               var c=s.charAt(0);

               if(c==="$")
               {
                  cacheable = false;
                  e=new VariableExpression(s, vars);
               }
               else if(c==="'" || c==='"') // quoted string
               {
                  e=new ConstantExpression(s.substring(1, s.length-1));
               }
               else if(s==="self" || s==="this")
               {
                  e=new EvaluatedObjectExpression();
               }
               else if(s==="null")
               {
                  e=new ConstantExpression(null);
               }
               else if(s==="undefined")
               {
                  e=new ConstantExpression(undefined);
               }
               else if(s==="true")
               {
                  e=new ConstantExpression(true);
               }
               else if(s==="false")
               {
                  e=new ConstantExpression(false);
               }
               else if(!isNaN(s))
               {
                  // e=+s;
                  e=new ConstantExpression(+s);
               }
               else // things are getting "fuzzy"
               {
                  if(s.match(/[\+\-\/\*]/) || s.match(/\s?.*?\s?\(.*?\)/))
                  {
                     e=FunctionExpression.parse(s);
                  }
                  else
                  {
                     // e=s; // keypath?
                     e=new KeyPathExpression(s);
                  }
               }

               // cache it up
               cacheable && (_cache[s]=e);
            }
            else
            {
               e=new ConstantExpression(s);
            }
         }
         else
         {
            if(e.type==="variable")
            {
               e._substitutionVariables=vars;
            }
         }
      }

      return e;
   };

   // getDependentKeyPaths: function(e){

   //    var ps=[];

   //    if(Expression.getType(e)==="keypath")
   //    {
   //       var splits=Expression.getKeyPath(e).replace(/@[a-zA-Z].+?\./g, "").split("."),
   //           key;

   //       while((key=splits.shift()))
   //       {
   //          if(key.indexOf("@")===-1) // if this key is not a collection operator
   //          {
   //             ps.push(key);

   //             break;
   //          }
   //       }
   //    }
   //    else if(e.type)
   //    {
   //       if(e.type==="function")
   //       {
   //          console.log("found function expression!");
   //       }
   //    }
   //    else
   //    {
   //       console.warn("not sure...", e);
   //    }

   //    return ps;
   // },

   Expression.expressionWithType=function(type, args){

      var className=Expression.getExpressionClassForType(type);

      if(className)
      {
         console.log("className: ", className);
         return window[className].apply(null, args);
      }

      return null;
   };

   Expression.expressionForConstantValue=function(v){
      // var e=Expression._expressionWithType("constant");

      // e.setConstant()
      return new ConstantExpression(v);
   };

   Expression.expressionForKeyPath=function(k){
      return new KeyPathExpression(k);
   };

   Expression.expressionForFunction=function(){
      return Expression._expressionWithType("function", arguments);
   };

   Expression.getExpressionClassForType=function(type){

      var classesByType={
         "constant":"ConstantExpression",
         "function":"FunctionExpression",
         "keyPath":"KeyPathExpression"
      };

      return classesByType[type];
   };

   Expression.evaluate = function(e, o, a) {
      var expression = Expression.parse(e);

      return expression.evaluateWithObject(o, a);
   };

   Expression.expressionReferencesKeys=function(){ return false; };
   Expression.expressionReferencesKeyPath=function(){ return false; };

   Expression.prototype.copy=function(){ console.warn("Expression subclasses require 'copy' to be overridden."); };
   Expression.prototype.stringify=function(){};
   Expression.prototype.toLocaleString=function(){ console.warn("Not Yet Implemented"); };
   Expression.prototype.getValueWithObject=function(){ console.warn("Expression subclasses require 'getValueWithObject' to be overridden."); };

   // expose
   (function(mod, name){
      (typeof(module)!=="undefined" ? (module.exports=mod) : ((typeof(define)!=="undefined" && define.amd) ? define(function(){ return mod; }) : (window[name]=mod)));
      root[name]=mod;
   })(Expression, "Expression");

})(this);
