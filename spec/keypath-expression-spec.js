var should=require("chai").should();
var Expression=require("../index.js");

describe("KeyPathExpression", function(){

   var expression;
   var object={
      "path" : {
         "to" : {
            "value" : "foo"
         }
      }
   };

   beforeEach(function(){
      expression=Expression.parse("path.to.value");
   });

   context("#getValueWithObject", function(){
      it("returns the value of the function", function(){
         expression.getValueWithObject(object).should.equal("foo");
      });
   });

   context("#getValueWithObject with custom getter", function(){
      it("returns the value using a custom getter", function(){

         var customGetter=function(){
            return "custom";
         };

         expression.getValueWithObject(object, customGetter).should.equal("custom");
      });
   });

   // context("#copy", function(){
   //    it("creates a copy of the receiver", function(){
   //       expression.copy().getValueWithObject().should.equal("foo");
   //    });
   // });
   //
   // context("#stringify", function(){
   //    it("returns a string representing the expression", function(){
   //       expression.stringify().should.equal("path.to.value");
   //    });
   // });
});
