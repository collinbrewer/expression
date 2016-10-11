var expect = require('chai').expect;
var Expression = require('../index.js');

describe('KeyPathExpression', function () {
	var object = {
		'path': {
			'to': {
				'value': 'foo'
			}
		},
		'ages': [{}, {age: 30}, {age: null}, {age: 'c'}, {age: 0}, {age: 10}, {age: 30}, {age: 50}]
	};

	context('#copy', function () {
		it('creates a copy', function () {
			var expression = Expression.parse('path');

			expect(expression.copy().getType()).to.equal('keyPath');
		});
	});

	context('#getType', function () {
		it('returns the type', function () {
			var expression = Expression.parse('path');

			expect(expression.getType()).to.equal('keyPath');
		});
	});

	context('#evaluate', function () {
		it('returns the value of the key', function () {
			expect(Expression.evaluate('path', object)).to.equal(object.path);
		});

		it('returns the value of the key path', function () {
			expect(Expression.evaluate('path.to.value', {})).to.be.undefined;
			expect(Expression.evaluate('path.to.value', object)).to.equal('foo');
		});

		it('should sum a collection', function () {
			expect(Expression.evaluate('@sum.age', [])).to.equal(0);
			expect(Expression.evaluate('@sum.age', object.ages)).to.equal(120);
		});

		it('should avg a collection', function () {
			expect(Expression.evaluate('@avg.age', [])).to.be.NaN;
			expect(Expression.evaluate('@avg.age', object.ages)).to.equal(15);
		});

		it('should return the min', function () {
			expect(Expression.evaluate('@min.age', [])).to.be.undefined;
			expect(Expression.evaluate('@min.age', object.ages)).to.equal(0);
		});

		it('should return the max', function () {
			expect(Expression.evaluate('@max.age', [])).to.be.undefined;
			expect(Expression.evaluate('@max.age', object.ages)).to.equal(50);
		});

		it('should return the median', function () {
			expect(Expression.evaluate('@median.age', [])).to.be.undefined;
			expect(Expression.evaluate('@median.age', object.ages)).to.equal(20);
		});

		it('should return the mode', function () {
			expect(Expression.evaluate('@mode.age', [])).to.be.undefined;
			expect(Expression.evaluate('@mode.age', object.ages)).to.equal(30);
		});

		it('should return the union', function () {
			expect(Expression.evaluate('@union.age', [])).to.deep.equal([]);
			expect(Expression.evaluate('@union.age', object.ages)).to.deep.equal([undefined, 30, null, 'c', 0, 10, 30, 50]);
		});

		it('should return the distinct union', function () {
			expect(Expression.evaluate('@distinctUnion.age', [])).to.deep.equal([]);
			expect(Expression.evaluate('@distinctUnion.age', object.ages)).to.deep.equal([undefined, 30, null, 'c', 0, 10, 50]);
		});
	});

	context('#getKeyPath', function () {
		it('returns the key path', function () {
			var expression = Expression.parse('path.to.key');

			expect(expression.getKeyPath()).to.equal('path.to.key');
		});

		it('ignores collection operators', function () {
			var expression = Expression.parse('@avg.amount');

			expect(expression.getFirstKeyInKeyPath()).to.equal('amount');
		});
	});

	context('#getFirstKeyInKeyPath', function () {
		it('returns first string', function () {
			var expression = Expression.parse('path.to.key');

			expect(expression.getFirstKeyInKeyPath()).to.equal('path');
		});

		it('ignores collection operators', function () {
			var expression = Expression.parse('@avg.amount');

			expect(expression.getFirstKeyInKeyPath()).to.equal('amount');
		});
	});

	context('#getDependentKeyPaths', function () {
		it('returns a key', function () {
			var expression = Expression.parse('path');
			expect(expression.getDependentKeyPaths()).to.deep.equal(['path']);
		});

		it('returns a keypath', function () {
			var expression = Expression.parse('path.to.value');
			expect(expression.getDependentKeyPaths()).to.deep.equal(['path']);
		});

		it('returns an aggregate key', function () {
			var expression = Expression.parse('@sum.path');
			expect(expression.getDependentKeyPaths()).to.deep.equal(['path']);
		});
	});

	context('#getValueWithObject with custom getter', function () {
		it('returns the value using a custom getter', function () {
			var customGetter = function () {
				return 'custom';
			};

			expect(Expression.evaluate('path.to.value', object, customGetter)).to.equal('custom');
		});
	});

	context('#stringify', function () {
		it('returns a string representing the expression', function () {
			var expression = Expression.parse('path.to.value');

			expect(expression.stringify()).to.equal('path.to.value');
		});
	});

	context('#toLocaleString', function () {
		it('creates a copy of the receiver', function () {
			var expression = Expression.parse('employer.name');

			expect(expression.toLocaleString()).to.equal('name of employer');
		});
	});
});
