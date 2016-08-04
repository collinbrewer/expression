var should=require("chai").should();
var Expression=require("../index.js");

describe("EvaluatedObjectExpression", function(){

   context("#getValueWithObject", function(){

      it("returns the given object(self)", function(){
         var o=new (function(){})();
         var expression=Expression.parse("self");

         expression.getValueWithObject(o).should.equal(o);
      });
   });

   context("#copy", function(){

      it("creates a copy of the receiver", function(){
         var o=new (function(){})();
         var expression=Expression.parse("self");

         expression.copy().getValueWithObject(o).should.equal(o);
      });
   });

   context("#stringify", function(){

      it("returns a string representing the expression", function(){
         var o=new (function(){})();
         var expression=Expression.parse("self");

         expression.stringify().should.equal("self");
      });
   });

});
