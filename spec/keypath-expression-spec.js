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

	context('#getValueWithObject with custom getter', function () {
		it('returns the value using a custom getter', function () {
			var customGetter = function () {
				return 'custom';
			};

			expect(Expression.evaluate('path.to.value', object, customGetter)).to.equal('custom');
		});
	});

	// context('#copy', function(){
	//	 it('creates a copy of the receiver', function(){
	//		 expression.copy().getValueWithObject().should.equal('foo');
	//	 });
	// });
	//
	// context('#stringify', function(){
	//	 it('returns a string representing the expression', function(){
	//		 expression.stringify().should.equal('path.to.value');
	//	 });
	// });
});
