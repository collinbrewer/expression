function AnyKeyExpression (value) {
	this.type = 'anykey';
}

AnyKeyExpression.prototype.getType = function () {
	return this.type;
};

AnyKeyExpression.prototype.copy = function () {
	return new AnyKeyExpression();
};

// ANYKEY == 'val'
AnyKeyExpression.prototype.getValueWithObject = function (o) {

};

AnyKeyExpression.prototype.getDependentKeyPaths = function () { return []; };

AnyKeyExpression.prototype.stringify = function () {
	return '*';
};

AnyKeyExpression.prototype.toLocaleString = function () {
	return 'any key';
};

module.exports = AnyKeyExpression;
