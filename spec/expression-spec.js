var should=require("chai").should();
var Expression=require("../index.js");

describe("Expression", function(){

   context("#parse", function(){

      it("returns a constant expression", function(){
         var expression=Expression.parse("1");

         expression.type.should.equal("constant");
      });

      it("returns a constant expression", function(){
         var expression=Expression.parse('undefined');

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
