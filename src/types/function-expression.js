(function(){

   var functionNamesByOperator={
      "+" : "add",
      "-" : "subtract",
      "*" : "multiply",
      "/" : "divide",
      "%" : "modulus"
   };

   // functions
   function add(a, b){ return a+b; }
   function subtract(a, b){ return a-b; }
   function multiply(a, b){ return a*b; }
   function divide(a, b){ return a/b; }
   function modulus(a, b){ return a%b; }

   function FunctionExpression(f, args)
   {
      this.type="function";
      this.func=f;
      this.arguments=args;
   }

   FunctionExpression.parse=function(s){

      var e=null,
          operatorRegex=/[\+\-\/\*]/g,
          match=s.match(operatorRegex);

      if(match)
      {
         var operator=match[0],
             args=s.split(operator);


         e=new FunctionExpression(operator, args);
      }

      return e;
   };

   FunctionExpression.prototype.getArguments=function(){
      return this.arguments;
   };

   FunctionExpression.prototype.copy=function(){
      return new FunctionExpression(this.func, this.arguments);
   };

   FunctionExpression.prototype.getFunction=function(){
      return this.func;
   };

   FunctionExpression.prototype.getValueWithObject=function(o, getter){

      var a=Expression.parse(this.arguments[0]),
          b=Expression.parse(this.arguments[1]);

      return FunctionExpression[FunctionExpression.functionNamesByOperator[this.func] || this.func](a.getValueWithObject(o, getter), b.getValueWithObject(o, getter));
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
      return this.func + "(" + this.arguments.join(", ") + ")";
   };

   FunctionExpression.prototype.toLocaleString=function(){
      return "function";
   };

   // expose
   (function(mod, name){
      (typeof(module)!=="undefined" ? (module.exports=mod) : ((typeof(define)!=="undefined" && define.amd) ? define(function(){ return mod; }) : (window[name]=mode)));
   })(FunctionExpression, "FunctionExpression");

})();
