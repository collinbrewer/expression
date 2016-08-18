var expect = require('chai').expect;
var Expression = require('../index.js');

describe('VariableExpression', function () {
	var object = {};

	context('#copy', function () {
		it('creates a copy of the receiver', function () {
			var expression = Expression.parse('$var', {'var': 'foo'});

			expect(expression.copy().type).to.equal('variable');
		});
	});

	context('#getValueWithObject', function () {
		it('returns the value of the function', function () {
			var expression = Expression.parse('$var', {'var': 'foo'});

			expect(expression.getValueWithObject(object)).to.equal('foo');
		});

		it("doesn't cache substitution variables", function () {
			var e1 = Expression.parse('$var', {'var': 'foo'});
			var e2 = Expression.parse('$var', {'var': 'bar'});

			expect(e1.getValueWithObject()).to.equal('foo');
			expect(e2.getValueWithObject()).to.equal('bar');
		});

		// it('should resolve array indexes', function(){
		//	 var expression=Expression.parse('?', ['a', 'b', 'c']);
		//	 expect(expression.getValueWithObject(object)).to.equal('b');
		// });
	});

	context('#getDependentKeyPaths', function () {
		it('returns a string representing the expression', function () {
			var expression = Expression.parse('$var', {'var': 'foo'});

			expect(expression.getDependentKeyPaths()).to.be.empty;
		});
	});

	context('#stringify', function () {
		it('returns a string representing the expression', function () {
			var expression = Expression.parse('$var', {'var': 'foo'});

			expect(expression.stringify()).to.equal('$var');
		});
	});

	context('#toLocaleString', function () {
		it('returns a human readable string in english', function () {
			var expression = Expression.parse('$var', {'var': 'foo'});

			expect(expression.toLocaleString()).to.equal('foo');
		});
	});
});
