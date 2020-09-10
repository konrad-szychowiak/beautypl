"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var tokens_1 = __importStar(require("./classes/tokens"));
var file = fs_1.default.readFileSync('./test_data/in.pro', 'utf8');
var _stack = [];
function shrink(stack, to, token_constructor) {
    var params;
    params = [];
    while (stack && stack[stack.length - 1].out != to) {
        var el = stack.pop();
        params.push(el);
    }
    if (stack) {
        stack.pop();
        var new_token = new token_constructor(params);
        stack.push(new_token);
        return stack;
    }
    else
        throw 'Stack is empty!';
}
function join_tag_params(stack, token_constructor) {
    var args = stack.pop();
    var functor = stack.pop();
    stack.push(new token_constructor(functor, args));
    stack.push(new tokens_1.SeparatorToken(':-'));
    return stack;
}
// TODO: add rule body parsing
// function collect_rule_body(_stack: Stack) {
//     return undefined;
// }
// TODO: inline arguments to function arguments
file
    .replace(/^%.*$/g, function (match) { return match + '.'; })
    .replace(/([|!*=<>:+\-\\\/]+|[%.,[\]()])/g, function (match) { return " " + match + " "; })
    .replace(/\s+/g, " ")
    .split(' ')
    .map(function (el) {
    switch (el) {
        case ']':
            _stack = shrink(_stack, '[', tokens_1.ListToken);
            break;
        case ')':
            _stack = shrink(_stack, '(', tokens_1.FArgsToken);
            break;
        case ':-':
            _stack = join_tag_params(_stack, tokens_1.RHeadToken);
            break;
        // case '.': _stack = collect_rule_body(_stack, )
        default:
            _stack.push(tokens_1.default(el));
    }
    return el;
});
console.log(_stack);
fs_1.default.writeFileSync('./test_data/out.json', JSON.stringify(_stack));
fs_1.default.writeFileSync('./test_data/out.pro', _stack.map(function (el) { return el.out; }).join(" ").replace(/\.\s+/g, ".\n"));
