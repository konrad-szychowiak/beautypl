"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeparatorToken = exports.OperatorToken = exports.VariableToken = exports.TagToken = void 0;
var uuid_1 = require("uuid");
var TagToken = /** @class */ (function () {
    function TagToken(word) {
        this.id = uuid_1.v4();
        this.name = word;
        this.out = word;
    }
    return TagToken;
}());
exports.TagToken = TagToken;
var VariableToken = /** @class */ (function (_super) {
    __extends(VariableToken, _super);
    function VariableToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VariableToken;
}(TagToken));
exports.VariableToken = VariableToken;
var OperatorToken = /** @class */ (function (_super) {
    __extends(OperatorToken, _super);
    function OperatorToken(word) {
        var _this = _super.call(this, word) || this;
        _this.out = " " + _this.name + " ";
        return _this;
    }
    return OperatorToken;
}(TagToken));
exports.OperatorToken = OperatorToken;
var SeparatorToken = /** @class */ (function (_super) {
    __extends(SeparatorToken, _super);
    function SeparatorToken(word, end) {
        if (end === void 0) { end = ' '; }
        var _this = _super.call(this, word) || this;
        _this.out = _this.name + end;
        return _this;
    }
    return SeparatorToken;
}(TagToken));
exports.SeparatorToken = SeparatorToken;
