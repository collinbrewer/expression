var expect = require('chai').expect;
var Expression = require('../index.js');
var AnyKeyExpression = require('../../expression/src/expression-types/anykey-expression.js');

describe('AnyKeyExpression', function () {
	context('#getValueWithObject', function () {
		it('returns true', function () {
			var expression = Expression.parse('*');

			expect(expression.getValueWithObject({foo: 1, bar: 2})).to.equal();
		});
	});

	context('#copy', function () {
		it('creates a copy of the receiver', function () {
			var expression = Expression.parse('*');

			expect(expression.copy()).to.be.an.instanceof(AnyKeyExpression);
		});
	});

	context('#stringify', function () {
		it('returns a string representation', function () {
			var expression = Expression.parse('*');

			expect(expression.stringify()).to.equal('*');
		});
	});

	context('#toLocaleString', function () {
		it('returns a human string in english', function () {
			var expression = Expression.parse('*');
			expect(expression.toLocaleString()).to.equal('any key');
		});
	});
});
