(function(){

   var functionNamesByOperator={
      "+" : "add",
      "-" : "subtract",
      "*" : "multiply",
      "/" : "divide",
      "%" : "modulus"
   };

   /*
    * Function Definition Regex
    * Matches:
    *    - function(a, b){ return a + " " + b; };
    *    - function named (a,b) { return a + " " + b; };
    * Groups:
    *    - $1 : function name (if given)
    *    - $2 : function parameters
    *    - $3 : function body
    */
   var functionDefinitionRegex=/^function\s?(.*)(\(.*?\))\s?\{(.*)?\};{0,1}$/;

   /*
    * Function Call Regex
    * Matches:
    *    - add(a,b)
    * Groups:
    *    - $1 : function name (if given)
    *    - $2 : function parameters
    */
   var functionCallRegex=/^(.*)?(\(.*?\))\s?;{0,1}$/;

   /*
    * Shorthand Regex
    * Matches:
    *    - a+b
    * Groups:
    *    - $1 : function name (if given)
    *    - $2 : function parameters
    */
   var operatorRegex=/[\+\-\/\*]/g;

   // functions
   var Reduce={
      add: function(a, b){ return a+b; },
      subtract: function(a, b){ return a-b; },
      multiply: function(a, b){ return a*b; },
      divide: function(a, b){ return a/b; },
      modulus: function(a, b){ return a%b; },
      concat: function(a, b){ return a + b; }
   };

   var reduce=[].reduce;

   var Predefined={
      add: function(){ return reduce.call(arguments, Reduce.add); },
      subtract: function(){ return reduce.call(arguments, Reduce.subtract); },
      multiply: function(){ return reduce.call(arguments, Reduce.multiply); },
      divide: function(){ return reduce.call(arguments, Reduce.divide); },
      modulus: function(){ return reduce.call(arguments, Reduce.modulus); },
      concat: function(){ return reduce.call(arguments, Reduce.concat); },
      hash: function(){
         console.log("arguments: ", arguments);
         console.log("this: ", this);
         var h={}, k, i=arguments.length-1;
         for(; i>=0; i--) {
            k=arguments[i];
            console.log("key: ", k);
            h[k]=this[k];
         }
         return h;
      }
   };

   // FIXME: this is *very* weak, need to bite the bullet and move to a true parser, BNF would be nice
   function parseArgs(argsString) {
      var args=[];
      var i = 0;
      var l = argsString.length;

      // find start of args
      for (; i < l; i++) {
        if (argsString[i] === "(") {
            break;
        }
      }

       // find each arg until close
       var c;
       var arg="";
       for(i=i+1; i<l;i++) {
          c=argsString[i];
          if(c==="," || c===")") {
             args.push(arg.trim());
             arg="";
             if(c===")")
             {
                break;
             }
          } else {
             arg=arg + c;
          }
       }

       return args;
   }

   /**
    * @class FunctionExpression
    * @description Creates an object describing a function that can be evaluated
    * @param {Object} receiver The target of the function
    * @param {String/Function} func The function or name of the function
    * @param {Array} arguments The arguments to be passed to the function
    * @return {Object} The new FunctionExpression
    */
   function FunctionExpression(target, func, args)
   {
      this.type="function";
      this.target=target;
      this.func=func;
      this.args=args;
   }

   // TODO: Support additional formats:
   // longhand: add(1, 2)
   // absolute: FUNCTION(receiver, selectorName, arguments, ...)
   // eval:     function(argument1, argument2){ return argument1+argument2; };
   FunctionExpression.parse=function(s){

      console.log("parsing: ", s);

      s=s.trim();

      var e=null;
      var fun=s.substr(0, 8);
      var match;

      if(fun==="FUNCTION") // absolute
      {
         match=s.match(functionDefinitionRegex);
         var args=parseArgs(match[2]);
         e=new FunctionExpression(args.shift(), args.shift(), args);
         e._subtype="absolute";
      }
      else if(fun==="function") // eval
      {
         match=s.match(functionDefinitionRegex);
         e=new FunctionExpression(null, s, parseArgs(match[2]));
         e._subtype="eval";
      }
      else if((match=s.match(functionCallRegex))) // longhand
      {
         e=new FunctionExpression(null, match[1], parseArgs(match[2]));
         e._subtype="longhand";
      }
      else // shorthand
      {
         var match=s.match(operatorRegex);

         if(match)
         {
            var operator=match[0],
                args=s.split(operator);

            e=new FunctionExpression(null, operator, args);
            e._subtype="shorthand";
         }
      }

      return e;
   };

   FunctionExpression.prototype.getArguments=function(){
      return this.args;
   };

   FunctionExpression.prototype.copy=function(){
      return new FunctionExpression(this.target, this.func, this.args);
   };

   FunctionExpression.prototype.getFunction=function(){
      return this.func;
   };

   FunctionExpression.prototype.getValueWithObject=function(o, getter){

      var Expression=require("../expression.js");

      var target=this.target;
      var func=this.func;
      var args=this.args;

      // sanitize func and target for predefined functions
      // convert shorthand to longhand name and target to "predefined" namespace
      if(func in functionNamesByOperator)
      {
         func=functionNamesByOperator[func];
         target=Predefined;
      }
      else if(func in Predefined)
      {
         target=Predefined;
      }

      // finalize the function
      func=target[func];

      // convert arguments to expressions and evaluate them
      var expressions=[];

      for(var i=0, l=args.length; i<l; i++)
      {
         expressions.push(Expression.parse(args[i]).getValueWithObject(o, getter));
      }

      return func.apply(o, expressions); // return func(a.getValueWithObject(o, getter), b.getValueWithObject(o, getter));
   };

   FunctionExpression.prototype.getDependentKeyPaths=function(){

      var ps=[],
          operatorRegex=/[\+\-\/\*]/,
          args=this.arguments;

      for(var i=0, l=args.length, a; i<l, (a=args[i]); i++)
      {
         a=Expression.parse(a);

         ps=ps.concat(a.getDependentKeyPaths());
      }

      return ps;
   };

   FunctionExpression.prototype._expressionReferencesKeyPath=function(){ return false; };

   FunctionExpression.prototype.stringify=function(){

      var func=this.func;

      if(func in functionNamesByOperator)
      {
         func=functionNamesByOperator[func];
      }

      return func + "(" + this.args.join(", ") + ")";
   };

   FunctionExpression.prototype.toLocaleString=function(){
      return "function";
   };

   // export
   (typeof(module)!=="undefined" ? (module.exports=FunctionExpression) : ((typeof(define)!=="undefined" && define.amd) ? define(function(){ return FunctionExpression; }) : (window.FunctionExpression=FunctionExpression)));

})();
