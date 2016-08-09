var expect = require('chai').expect;
var Expression = require('../index.js');

describe('EvaluatedObjectExpression', function () {
	context('#getValueWithObject', function () {
		it('returns the given object(self)', function () {
			var o = new function () {}();
			var expression = Expression.parse('self');

			expect(expression.getValueWithObject(o)).to.equal(o);
		});
	});

	context('#copy', function () {
		it('creates a copy of the receiver', function () {
			var o = new function () {}();
			var expression = Expression.parse('self');

			expect(expression.copy().getValueWithObject(o)).to.equal(o);
		});
	});

	context('#stringify', function () {
		it('returns a string representing the expression', function () {
			var expression = Expression.parse('self');

			expect(expression.stringify()).to.equal('self');
		});
	});
});
