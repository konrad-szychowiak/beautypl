"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeparatorToken = exports.OperatorToken = exports.VariableToken = exports.TagToken = exports.RHeadToken = exports.ClauseToken = exports.FArgsToken = exports.CommentToken = exports.ListToken = exports.FactToken = void 0;
var uuid_1 = require("uuid");
var clauseToken_1 = require("./clauseToken");
Object.defineProperty(exports, "ClauseToken", { enumerable: true, get: function () { return clauseToken_1.ClauseToken; } });
Object.defineProperty(exports, "RHeadToken", { enumerable: true, get: function () { return clauseToken_1.RHeadToken; } });
var commentToken_1 = require("./commentToken");
Object.defineProperty(exports, "CommentToken", { enumerable: true, get: function () { return commentToken_1.CommentToken; } });
var tagToken_1 = require("./tagToken");
Object.defineProperty(exports, "OperatorToken", { enumerable: true, get: function () { return tagToken_1.OperatorToken; } });
Object.defineProperty(exports, "SeparatorToken", { enumerable: true, get: function () { return tagToken_1.SeparatorToken; } });
Object.defineProperty(exports, "TagToken", { enumerable: true, get: function () { return tagToken_1.TagToken; } });
Object.defineProperty(exports, "VariableToken", { enumerable: true, get: function () { return tagToken_1.VariableToken; } });
var groupToken_1 = require("./groupToken");
Object.defineProperty(exports, "FArgsToken", { enumerable: true, get: function () { return groupToken_1.FArgsToken; } });
Object.defineProperty(exports, "ListToken", { enumerable: true, get: function () { return groupToken_1.ListToken; } });
// interface Token {
//     label: string
//     contents: string[]
//     output: () => string
// }
// class PrototypeToken {
//     label: string
//     contents: string[]
//     output: () => string
//     id: number
// }
var FactToken = /** @class */ (function () {
    function FactToken(text) {
        var _this = this;
        this.output = function () { return _this.name + "(" + _this.arguments.join("").replace(/,/g, ", ") + "). % fact"; };
        this.name = text[0];
        this.arguments = text.slice(2, -1);
        this.id = uuid_1.v4();
    }
    return FactToken;
}());
exports.FactToken = FactToken;
function default_1(word) {
    if (/^[A-Z][\w_ąęółśźż]*$/.test(word))
        return new tagToken_1.VariableToken(word);
    if (word === ',')
        return new tagToken_1.SeparatorToken(word);
    if (/^[|+]+$/.test(word))
        return new tagToken_1.OperatorToken(word);
    return new tagToken_1.TagToken(word);
}
exports.default = default_1;
