var expect = require('chai').expect;
var Expression = require('../index.js');
var EvaluatedObjectExpression = require('../src/expression-types/evaluated-object-expression.js');

describe('EvaluatedObjectExpression', function () {
	context('#getType', function () {
		it('returns anykey', function () {
			var expression = new EvaluatedObjectExpression();

			expect(expression.getType()).to.equal('evaluatedObject');
		});
	});

	context('#getDependentKeyPaths', function () {
		it('should return empty', function () {
			var expression = Expression.parse('self');

			expect(expression.getDependentKeyPaths()).to.be.empty;
		});
	});

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

	context('#toLocaleString', function () {
		it('should return self', function () {
			var expression = Expression.parse('self');
			expect(expression.toLocaleString()).to.equal('self');
		});
	});
});
