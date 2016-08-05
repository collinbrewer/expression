var expect=require('chai').expect;
var Expression=require('../index.js');

describe('KeyPathExpression', function(){

   var expression;
   var object={
      'path' : {
         'to' : {
            'value' : 'foo'
         }
      },
      'ages': [{age:10}, {age:30}, {age:50}, {}]
   };

   beforeEach(function(){
      expression=Expression.parse('path.to.value');
   });

   context('#getValueWithObject', function(){
      it('returns the value of the key', function(){
         expect(expression.getValueWithObject(object)).to.equal('foo');
      });

      it('should sum a collection', function(){
         var expression = Expression.parse('@sum.age');

         expect(expression.getValueWithObject(object.ages)).to.equal(90);
      });
   });

   context('#getValueWithObject with custom getter', function(){
      it('returns the value using a custom getter', function(){

         var customGetter=function(){
            return 'custom';
         };

         expect(expression.getValueWithObject(object, customGetter)).to.equal('custom');
      });
   });

   // context('#copy', function(){
   //    it('creates a copy of the receiver', function(){
   //       expression.copy().getValueWithObject().should.equal('foo');
   //    });
   // });
   //
   // context('#stringify', function(){
   //    it('returns a string representing the expression', function(){
   //       expression.stringify().should.equal('path.to.value');
   //    });
   // });
});
