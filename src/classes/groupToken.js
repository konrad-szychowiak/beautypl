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
exports.RBodyToken = exports.FArgsToken = exports.ListToken = void 0;
var uuid_1 = require("uuid");
var GroupToken = /** @class */ (function () {
    function GroupToken(content, start, end) {
        this.id = uuid_1.v4();
        this.args = content;
        this.start = start;
        this.end = end;
        this.out = this.out = this.start + this.args.reverse().map(function (el) { return el.out; }).join("") + this.end;
    }
    return GroupToken;
}());
var ListToken = /** @class */ (function (_super) {
    __extends(ListToken, _super);
    function ListToken(content, start, end) {
        var _this = _super.call(this, content, start || '[', end || ']') || this;
        var text_args = _this.args.map(function (el) { return el.out; }).join("");
        text_args = /[|,]/.test(text_args) ? " " + text_args + " " : text_args;
        _this.out = (_this.start + text_args + _this.end).replace(/(?<=\[]) (?=\[])/g, "");
        return _this;
    }
    return ListToken;
}(GroupToken));
exports.ListToken = ListToken;
var FArgsToken = /** @class */ (function (_super) {
    __extends(FArgsToken, _super);
    function FArgsToken(content, start, end) {
        return _super.call(this, content, start || '(', end || ')') || this;
    }
    return FArgsToken;
}(GroupToken));
exports.FArgsToken = FArgsToken;
var RBodyToken = /** @class */ (function (_super) {
    __extends(RBodyToken, _super);
    function RBodyToken(content, start, end) {
        var _this = _super.call(this, content, start || ':-', end || '. ') || this;
        _this.out = _this.start + " " + _this.args.map(function (el) { return el.out; }).join(", ") + _this.end;
        return _this;
    }
    return RBodyToken;
}(GroupToken));
exports.RBodyToken = RBodyToken;
