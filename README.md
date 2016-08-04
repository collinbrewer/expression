# Expression
[![Dependency Status](https://img.shields.io/david/collinbrewer/expression/master.svg)](https://david-dm.org/collinbrewer/expression.svg)
[![Build Status](https://img.shields.io/travis/collinbrewer/expression.svg)](https://travis-ci.org/collinbrewer/expression)
[![Coveralls](https://img.shields.io/coveralls/collinbrewer/expression.svg?maxAge=2592000)](https://coveralls.io/github/collinbrewer/expression)

A utility for node and browser that evaluates objects against an expression.

## Install
```sh
npm install @collinbrewer/expression -S
```

## Usage

```js
var Expression=require("expression");
```

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
