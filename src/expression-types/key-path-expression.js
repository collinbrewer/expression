var JSONPointer = require('json-pointer');
var DotPointer = JSONPointer.Factory({delimiter: '.'});
var operations = require('../util/functions.js');

function KeyPathExpression (keyPath) {
	this.type = 'keyPath';

	this.keyPath = keyPath;
}

KeyPathExpression.prototype.copy = function () {
	return new KeyPathExpression(this.keyPath);
};

KeyPathExpression.prototype.getType = function () {
	return 'keyPath';
};

KeyPathExpression.prototype.getValueWithObject = function (o, getter) {
	var value;
	var keyPath = this.keyPath;

	// is collection operator
	if (keyPath.charAt(0) === '@') {
		var index = keyPath.indexOf('.');
		var operator = keyPath.substr(1, index - 1);
		keyPath = keyPath.substr(index + 1);
		var a = o.map(function (c) {
			return DotPointer.evaluate(keyPath, c, {'evaluateToken': getter});
		});

		value = operations[operator](a);
	}
	else {
		value = DotPointer.evaluate(keyPath, o, {'evaluateToken': getter});
	}

	return value;
};

KeyPathExpression.prototype.getKeyPath = function () {
	return this.keyPath;
};

KeyPathExpression.prototype.getDependentKeyPaths = function () {
	var ps = [];

	var splits = this.keyPath.replace(/@[a-zA-Z].+?\./g, '').split('.');
	var key;

	while ((key = splits.shift())) {
		if (key.indexOf('@') === -1 && key.indexOf('$') === -1) { // if this key is not a collection operator
			ps.push(key);

			break;
		}
	}

	return ps;
};

KeyPathExpression.prototype.getFirstKeyInKeyPath = function () {
	var components = this.keyPath.split('.');
	var firstKey = null;
	var key;

	while ((key = components.shift())) {
		if (key.charAt(0) !== '@') {
			firstKey = key;
			break;
		}
	}

	return firstKey;
};

KeyPathExpression.prototype._expressionReferencesKeys = function (ks) {
	return (ks.indexOf(this.keyPath) >= 0); // TODO: I don't think this is complete because the our keypath could contain one of the keys
};

KeyPathExpression.prototype._expressionReferencesKeyPath = function () {
	return (this.keyPath.indexOf('.') !== -1);
};

KeyPathExpression.prototype.stringify = function () {
	return this.keyPath;
};

// name -> name
// business.name -> name of business
// boss.business.name -> name of business of boss
KeyPathExpression.prototype.toLocaleString = function () {
	return this.keyPath.split('.').reverse().join(' of ');
};

module.exports = KeyPathExpression;
