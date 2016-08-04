var expect=require("chai").expect;
var Expression=require("../index.js");

describe("VariableExpression", function(){

   var expression;
   var object={};

   context("#getValueWithObject", function(){
      it("returns the value of the function", function(){
         var expression=Expression.parse("$var", {'var':'foo'});

         expect(expression.getValueWithObject(object)).to.equal("foo");
      });

      it("doesn't cache substitutaion variables", function(){
         var e1=Expression.parse("$var", {'var':'foo'});
         var e2=Expression.parse("$var", {'var':'bar'});

         expect(e1.getValueWithObject(object)).to.equal("foo");
         expect(e2.getValueWithObject(object)).to.equal("bar");
      });

      // it('should resolve array indexes', function(){
      //    var expression=Expression.parse('?', ['a', 'b', 'c']);
      //    expect(expression.getValueWithObject(object)).to.equal('b');
      // });
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
