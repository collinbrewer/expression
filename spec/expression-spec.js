var should=require("chai").should();
var Expression=require("../index.js");

describe("Expression", function(){

   context("#parse", function(){

      it("returns a constant expression", function(){
         var expression=Expression.parse("1");

         expression.type.should.equal("constant");
      });

      it("returns an evaluated expression", function(){
         var expression=Expression.parse("self");

         expression.type.should.equal("evaluatedObject");
      });

      // it("returns a function expression", function(){
      //    var expression=Expression.parse("1");
      //
      //    expression.type.should.equal("function");
      // });

      it("returns a key path expression", function(){
         var expression=Expression.parse("key.path");

         expression.type.should.equal("keyPath");
      });

      it("returns a variable expression", function(){
         var expression=Expression.parse("$variable");

         expression.type.should.equal("variable");
      });
   });
});

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

describe("FunctionExpression", function(){

   var expression;
   var func;
   var args;

   context("#getValueWithObject", function(){
      it("returns the value of the function", function(){
         expression=Expression.parse("1+2");
         expression.getValueWithObject().should.equal(3);
      });
   });

   context("#copy", function(){
      it("creates a copy of the receiver", function(){
         expression=Expression.parse("1+2");
         expression.copy().getValueWithObject().should.equal(3);
      });
   });

   context("#parse", function(){
      it("create a function expression from a shorthand string representation", function(){
         expression=Expression.parse("1+2");
      });

      it("create a function expression from a longhand string representation", function(){
         expression=Expression.parse("add(1,2)");
         expression.getValueWithObject().should.equal(3);
      });
      //
      // it("create a function expression from an absolute string representation", function(){
      //    expression=Expression.parse("FUNCTION(self, 'add', 1, 2)");
      //    expression.getValueWithObject({add:function(a, b){ return a+b; }).should.equal(3);
      // });

      // it("create a function expression from an eval string representation", function(){
      //    expression=Expression.parse("function(o){ return o.firstName + ' ' + o.lastName; }");
      //    expression.getValueWithObject({firstName:"Chris", lastName:"Ericson"}).should.equal("Chris Ericson");
      // });
   });

   context("#predefined", function(){
      it("adds number arguments", function(){
         Expression.parse("add(1,2,3)").getValueWithObject().should.equal(6);
         Expression.parse("1+2+3").getValueWithObject().should.equal(6);
      });

      it("subtracts number arguments", function(){
         Expression.parse("subtract(10, 3, 2, 1)").getValueWithObject().should.equal(4);
      });

      it("multiply number arguments", function(){
         Expression.parse("multiply(2, 3, 4)").getValueWithObject().should.equal(24);
      });

      it("divide number arguments", function(){
         Expression.parse("divide(40, 2, 5)").getValueWithObject().should.equal(4);
      });

      it("modulus number arguments", function(){
         Expression.parse("modulus(5,2)").getValueWithObject().should.equal(1);
      });

      it("concatenate string arguments", function(){
         Expression.parse('concat("a", " ", "b")').getValueWithObject().should.equal("a b");
      });

      it("creates a simple hash", function(){
         var expression=Expression.parse('hash("a", "b")');
         var value=expression.getValueWithObject({a:"a", b:"b", c:"c"});
         value.should.have.property("a");
         value.should.have.property("b");
         value.should.not.have.property("c");
      });

      // it("creates a complex hash", function(){
      //    var expression=Expression.parse('hash({"name":"concat()"})');
      //    var value=expression.getValueWithObject({profile:{firstName:"Chris", lastName:"Ericson"}});
      //    value.should.have.property("a");
      //    value.should.have.property("b");
      //    value.should.not.have.property("c");
      // });
   });

   context("#stringify", function(){
      it("returns a string representing the expression", function(){
         expression=Expression.parse("1+2");
         expression.stringify().should.equal("add(1, 2)");
      });
   });
});

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
            console.log("getting: ", arguments);
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

describe("VariableExpression", function(){

   var expression;
   var object={};

   beforeEach(function(){
      expression=Expression.parse("$var");
   });

   context("#getValueWithObject", function(){
      it("returns the value of the function", function(){
         expression.getValueWithObject(object, {"var":"foo"}).should.equal("foo");
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
