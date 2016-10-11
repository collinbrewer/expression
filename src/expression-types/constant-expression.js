function ConstantExpression (value) {
	this.type = 'constant';
	this.value = value;
}

ConstantExpression.prototype.getType = function () {
	return this.type;
};

ConstantExpression.prototype.copy = function () {
	return new ConstantExpression(this.value);
};

ConstantExpression.prototype.getValueWithObject = function (o) {
	return this.value;
};

ConstantExpression.prototype.getDependentKeyPaths = function () { return []; };

ConstantExpression.prototype.stringify = function () {
	return JSON.stringify(this.value); // v=(v===null ? "null" : (v===undefined ? "undefined" : v.toString()));
};

ConstantExpression.prototype.toLocaleString = function () {
	return this.stringify();
};

module.exports = ConstantExpression;
