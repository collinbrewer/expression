var JSONPointer = require('@collinbrewer/json-pointer');
var DotPointer = JSONPointer.Factory({delimiter: '.'});

function VariableExpression (variable, vars) {
	this.type = 'variable';
	this.variable = variable;

	this._substitutionVariables = vars;
}

VariableExpression.prototype.getType = function () {
	return this.type;
};

VariableExpression.prototype.copy = function () {
	return new VariableExpression(this.variable, this._substitutionVariables); // Note sure this is needed... .Util.extend({}, this._substitutionVariables));
};

VariableExpression.prototype.getValueWithObject = function (o, vars) {
	var value;

	vars || (vars = this._substitutionVariables);

	if (vars) {
		value = DotPointer.evaluate(this.variable.substr(1), vars);
	}
	else {
		console.error('no values given for variable expression: ', this);
	}

	return value;
};

VariableExpression.prototype.getDependentKeyPaths = function () { return []; };

VariableExpression.prototype.stringify = function () {
	return this.variable;
};

VariableExpression.prototype.toLocaleString = function (shouldSubstitute) {
	return this.getValueWithObject();
};

module.exports = VariableExpression;
