var expect = require('chai').expect;
var Expression = require('../index.js');

describe('ConstantExpression', function () {
	context('#getValueWithObject', function () {
		it('returns the constant value', function () {
			var expression = Expression.parse('\'foo\'');

			expect(expression.getValueWithObject({})).to.equal('foo');
		});
	});

	context('#copy', function () {
		it('creates a copy of the receiver', function () {
			var expression = Expression.parse('"foo"');

			expect(expression.copy().getValueWithObject({})).to.equal('foo');
		});
	});

	context('#stringify', function () {
		it('returns a string representing the string', function () {
			var expression = Expression.parse('"foo"');

			expect(expression.stringify()).to.equal('"foo"');
		});

		it('returns a string representing the boolean', function () {
			var expression = Expression.parse('true');

			expect(expression.stringify()).to.equal('true');
		});

		it('returns a string representing the number', function () {
			var expression = Expression.parse('1');

			expect(expression.stringify()).to.equal('1');
		});

		it('returns a string representing the object', function () {
			var expression = Expression.parse('{}');

			expect(expression.stringify()).to.equal('{}');
		});

		it('returns a string representing the array', function () {
			var expression = Expression.parse('[]');

			expect(expression.stringify()).to.equal('[]');
		});
	});
});
