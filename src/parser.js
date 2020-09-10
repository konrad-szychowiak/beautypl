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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var tokens_1 = __importStar(require("./classes/tokens"));
var groupToken_1 = require("./classes/groupToken");
var uuid_1 = require("uuid");
var file = fs_1.default.readFileSync('./test_data/in.pro', 'utf8');
var _stack = [];
var _comments = [];
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
// FIXME: something doesn't work here
function collect_rule_body(stack) {
    var body = [];
    while (stack.length > 1 && stack[stack.length - 1].out !== ':-' && stack[stack.length - 1].out !== '.') {
        var el = stack.pop();
        if (el instanceof tokens_1.OperatorToken) {
            var a = body.pop();
            var b = stack.pop();
            console.log("a, b", a, b);
            var func = new tokens_1.MathsToken(el, [b, a]);
            // console.error("rule body func: ", func)
            body.push(func);
        }
        else if (el instanceof tokens_1.FArgsToken) {
            var n = stack.pop();
            body.push(new tokens_1.ClauseToken(n, el));
        }
        else if (el instanceof tokens_1.SeparatorToken) {
        }
        else {
            // console.error("rule body el: ", el)
            body.push(el);
        }
    }
    body = body.reverse();
    fs_1.default.writeFileSync('./test_data/out.log', body.map(function (el) { return el.out; }).join("").replace(/\.\s*/g, ".\n"));
    stack = __spreadArrays(stack, [new groupToken_1.RBodyToken(body), new tokens_1.SeparatorToken('.')]);
    return stack;
}
// TODO: inline arguments to function arguments
file
    .replace(/^%.*$/gm, function (match) {
    var id = uuid_1.v4().replace(/-/g, "%");
    var text = match;
    _comments.push({ id: id, text: text });
    return "%" + id;
})
    .replace(/([|!*=<>:+\-\\\/]+|[.,[\]()])/g, function (match) { return " " + match + " "; })
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
        // case '.':
        //     _stack = collect_rule_body(_stack);
        //     break;
        default:
            _stack.push(tokens_1.default(el, _comments));
    }
    return el;
});
// console.log(_stack)
fs_1.default.writeFileSync('./test_data/out.json', JSON.stringify(_stack.map(function (el) { return el.out; })));
fs_1.default.writeFileSync('./test_data/out.pro', _stack.map(function (el) { return el.out; }).join(" ").replace(/\.\s+/g, ".\n"));
