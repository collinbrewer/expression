# Expression
A utility for node and browser that evaluates objects against an expression.

## Usage

Constants:
```javascript
Expression.parse("'Value'").getValueWithObject(); // -> 'Value'
Expression.parse("4").getValueWithObject(); // -> 4
```

Functions:
```javascript
var doc={firstName:"Chris", lastName:"Ericson"}
Expression.parse("concat('firstName', ' ', 'lastName')").getValueWithObject(doc); // -> "Chris Ericson"
```

Arithmetic:
```javascript
Expression.parse("1+2+3").getValueWithObject(); // -> 6
Expression.parse("multiply(2, 6)"); // -> 12
```
