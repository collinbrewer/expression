function AnyKeyExpression (value) {
	this.type = 'anykey';
}

AnyKeyExpression.prototype.copy = function () {
	return new AnyKeyExpression();
};

// ANYKEY == 'val'
AnyKeyExpression.prototype.getValueWithObject = function (o) {

};

AnyKeyExpression.prototype.getDependentKeyPaths = function () { return []; };
AnyKeyExpression.prototype._expressionReferencesKeys = function () { return false; };
AnyKeyExpression.prototype._expressionReferencesKeyPath = function () { return false; };

AnyKeyExpression.prototype.stringify = function () {
	return '*';
};

AnyKeyExpression.prototype.toLocaleString = function () {
	return 'any key';
};

module.exports = AnyKeyExpression;
