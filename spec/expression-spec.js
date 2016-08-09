var expect = require('chai').expect;
var Expression = require('../index.js');

describe('Expression', function () {
	context('#parse', function () {
		it('returns a constant expression', function () {
			var expression = Expression.parse('1');

			expect(expression.type).to.equal('constant');
		});

		it('returns a constant expression', function () {
			var expression = Expression.parse('undefined');

			expect(expression.type).to.equal('constant');
		});

		it('returns an evaluated expression', function () {
			var expression = Expression.parse('self');

			expect(expression.type).to.equal('evaluatedObject');
		});

		// it("returns a function expression", function(){
		//	 var expression=Expression.parse("1");
		//
		//	 expression.type.should.equal("function");
		// });

		it('returns a key path expression', function () {
			var expression = Expression.parse('key.path');

			expect(expression.type).to.equal('keyPath');
		});

		it('returns a variable expression', function () {
			var expression = Expression.parse('$variable');

			expect(expression.type).to.equal('variable');
		});
	});
});
