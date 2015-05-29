// dependencies
var Expression=require("./src/expression.js");

var ConstantExpression=require("./src/types/constant-expression.js");
var EvaluatedExpression=require("./src/types/evaluated-object-expression.js");
var EvaluatedExpression=require("./src/types/function-expression.js");
var FunctionExpression=require("./src/types/function-expression.js");
var KeyPathExpression=require("./src/types/key-path-expression.js");
var VariableExpression=require("./src/types/variable-expression.js");

// expose
(function(mod, name){
   (typeof(module)!=="undefined" ? (module.exports=mod) : ((typeof(define)!=="undefined" && define.amd) ? define(function(){ return mod; }) : (window[name]=mode)));
})(Schema, "Schema");
