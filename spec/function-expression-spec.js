var expect = require('chai').expect;
var Expression = require('../index.js');
var FunctionExpression = require('../src/expression-types/function-expression.js');

describe('FunctionExpression', function () {
	var expression;
	context('#constructor', function () {
		it('should construct with parameters', function () {
			var expression = new FunctionExpression('asdf', 'charAt', [0]);
			expect(expression.target).to.equal('asdf');
			expect(expression.func).to.equal('charAt');
			expect(expression.args).to.deep.equal([0]);
		});
	});

	context('#getType', function () {
		it('returns the type', function () {
			var expression = new FunctionExpression('asdf', 'charAt', [0]);

			expect(expression.getType()).to.equal('function');
		});
	});

	context('#parse', function () {
		it('should parse absolute form', function () {
			var expression = FunctionExpression.parse('FUNCTION("foobar", "slice", 0, 3)');
			expect(expression).to.exist;
			expect(expression.target).to.equal('foobar');
			expect(expression.func).to.equal('slice');
			// expect(expression.args).to.deep.equal([0, 3]);
			expect(expression.getValueWithObject()).to.equal('foo');
		});

		it('should parse longhand form', function () {
			var expression = FunctionExpression.parse('add(1, 2)');
			expect(expression).to.exist;
			expect(expression.target).to.be.undefined;
			expect(expression.func).to.equal('add');
			// expect(expression.args).to.deep.equal([1, 2]);
		});

		it('should parse eval', function () {
			var expression = FunctionExpression.parse('function add(arg1, arg2){ return arg1+arg2; }');
			expect(expression).to.exist;
			expect(expression.target).to.be.undefined;
			expect(expression.func).to.equal('function add(arg1, arg2){ return arg1+arg2; }');
			expect(expression.args).to.deep.equal(['arg1', 'arg2']);
		});
	});

	context('#getValueWithObject', function () {
		it('returns the value of the function', function () {
			expression = Expression.parse('1+2');
			expect(expression.getValueWithObject()).to.equal(3);
		});
	});

	context('#getDependentKeyPaths', function () {
		it('returns the dependent key paths', function () {
			expression = Expression.parse('age+10');
			expect(expression.getDependentKeyPaths()).to.deep.equal(['age']);
		});
	});

	context('#copy', function () {
		it('creates a copy of the receiver', function () {
			expression = Expression.parse('1+2');
			expect(expression.copy().getValueWithObject()).to.equal(3);
		});
	});

	context('#parse', function () {
		it('create a function expression from a shorthand string representation', function () {
			expression = Expression.parse('1+2');
		});

		it('create a function expression from a longhand string representation', function () {
			expression = Expression.parse('add(1,2)');
			expect(expression.getValueWithObject()).to.equal(3);
		});
		//
		// it("create a function expression from an absolute string representation", function(){
		//	 expression=Expression.parse("FUNCTION(self, 'add', 1, 2)");
		//	 expression.getValueWithObject({add:function(a, b){ return a+b; }).should.equal(3);
		// });

		// it("create a function expression from an eval string representation", function(){
		//	 expression=Expression.parse("function(o){ return o.firstName + ' ' + o.lastName; }");
		//	 expression.getValueWithObject({firstName:"Chris", lastName:"Ericson"}).should.equal("Chris Ericson");
		// });
	});

	context('#getArguments', function () {
		it('should return the arguments', function () {
			var expression = new FunctionExpression(null, 'sum', [1, 2]);
			expect(expression.getArguments()).to.deep.equal([1, 2]);
		});
	});

	context('#getFunction', function () {
		it('should return the function', function () {
			var expression = new FunctionExpression(null, 'sum', [1, 2]);
			expect(expression.getFunction()).to.equal('sum');
		});
	});

	context('#toLocaleString', function () {
		it('should return the locale string', function () {
			var expression = new FunctionExpression(null, 'sum', [1, 2]);
			expect(expression.toLocaleString()).to.equal('function');
		});
	});

	context('#predefined', function () {
		it('adds number arguments', function () {
			expect(Expression.parse('add(1,2,3)').getValueWithObject()).to.equal(6);
			expect(Expression.parse('1+2+3').getValueWithObject()).to.equal(6);
		});

		it('subtracts number arguments', function () {
			expect(Expression.parse('subtract(10, 3, 2, 1)').getValueWithObject()).to.equal(4);
		});

		it('multiply number arguments', function () {
			expect(Expression.parse('multiply(2, 3, 4)').getValueWithObject()).to.equal(24);
		});

		it('divide number arguments', function () {
			expect(Expression.parse('divide(40, 2, 5)').getValueWithObject()).to.equal(4);
		});

		it('modulus number arguments', function () {
			expect(Expression.parse('modulus(5,2)').getValueWithObject()).to.equal(1);
		});

		it('concatenate string arguments', function () {
			expect(Expression.parse('concat("a", " ", "b")').getValueWithObject()).to.equal('a b');
		});

		it('creates a simple hash', function () {
			var expression = Expression.parse('hash("a", "b")');
			var value = expression.getValueWithObject({a: 'a', b: 'b', c: 'c'});
			expect(value).to.have.property('a');
			expect(value).to.have.property('b');
			expect(value).to.not.have.property('c');
		});

		// it("creates a complex hash", function(){
		//	 var expression=Expression.parse('hash({"name":"concat()"})');
		//	 var value=expression.getValueWithObject({profile:{firstName:"Chris", lastName:"Ericson"}});
		//	 value.should.have.property("a");
		//	 value.should.have.property("b");
		//	 value.should.not.have.property("c");
		// });
	});

	context('#stringify', function () {
		it('returns a string representing the expression', function () {
			expression = Expression.parse('1+2');
			expect(expression.stringify()).to.equal('add(1, 2)');
		});
	});
});
