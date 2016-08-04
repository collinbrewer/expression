var should=require("chai").should();
var Expression=require("../index.js");

describe("ConstantExpression", function(){

   context("#getValueWithObject", function(){

      it("returns the constant value", function(){
         var expression=Expression.parse("'foo'");

         // console.log("expression: ", expression);

         expression.getValueWithObject({}).should.equal("foo");
      });
   });

   context("#copy", function(){

      it("creates a copy of the receiver", function(){
         var expression=Expression.parse("'foo'");

         expression.copy().getValueWithObject({}).should.equal("foo");
      });
   });

   context("#stringify", function(){

      it("returns a string representing the string", function(){
         var expression=Expression.parse("'foo'");

         expression.stringify().should.equal("\"foo\"");
      });

      it("returns a string representing the boolean", function(){
         var expression=Expression.parse("true");

         expression.stringify().should.equal("true");
      });

      it("returns a string representing the number", function(){
         var expression=Expression.parse("1");

         expression.stringify().should.equal("1");
      });

      it("returns a string representing the object", function(){
         var expression=new Expression.parse("{}");

         expression.stringify().should.equal("{}");
      });

      it("returns a string representing the array", function(){
         var expression=Expression.parse("[]");

         expression.stringify().should.equal("[]");
      });
   });
});
