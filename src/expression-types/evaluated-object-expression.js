function EvaluatedObjectExpression () {
	this.type = 'evaluatedObject';
}

EvaluatedObjectExpression.prototype.copy = function () {
	return new EvaluatedObjectExpression();
};

EvaluatedObjectExpression.prototype.getValueWithObject = function (o) {
	return o;
};

EvaluatedObjectExpression.prototype.getDependentKeyPaths = function () { return []; };

EvaluatedObjectExpression.prototype._expressionReferencesKeys = function () { return false; };
EvaluatedObjectExpression.prototype._expressionReferencesKeyPath = function () { return false; };

EvaluatedObjectExpression.prototype.stringify = function () {
	return 'self';
};

EvaluatedObjectExpression.prototype.toLocaleString = function () {
	return 'self';
};

module.exports = EvaluatedObjectExpression;
