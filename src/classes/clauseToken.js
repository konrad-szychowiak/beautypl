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
exports.MathsToken = exports.RHeadToken = exports.ClauseToken = void 0;
var uuid_1 = require("uuid");
var ClauseToken = /** @class */ (function () {
    function ClauseToken(clause_name, clause_args) {
        var _a;
        this.id = uuid_1.v4();
        this.name = clause_name;
        this.args = clause_args;
        this.out = this.name.out + ((_a = this.args) === null || _a === void 0 ? void 0 : _a.out);
    }
    return ClauseToken;
}());
exports.ClauseToken = ClauseToken;
var RHeadToken = /** @class */ (function (_super) {
    __extends(RHeadToken, _super);
    function RHeadToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RHeadToken;
}(ClauseToken));
exports.RHeadToken = RHeadToken;
var MathsToken = /** @class */ (function (_super) {
    __extends(MathsToken, _super);
    function MathsToken(name, args, infix) {
        if (infix === void 0) { infix = true; }
        var _this = _super.call(this, name) || this;
        _this._args = args;
        if (infix) {
            _this.out = _this._args[0].out + _this.name.out + _this._args[1].out;
        }
        else {
            _this.out = _this.name.out + "(" + _this._args[0].out + ", " + _this._args[1].out + ")";
        }
        return _this;
    }
    return MathsToken;
}(ClauseToken));
exports.MathsToken = MathsToken;
