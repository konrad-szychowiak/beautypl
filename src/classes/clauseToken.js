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
exports.RHeadToken = exports.ClauseToken = void 0;
var uuid_1 = require("uuid");
var ClauseToken = /** @class */ (function () {
    function ClauseToken(clause_name, clause_args) {
        this.id = uuid_1.v4();
        this.name = clause_name;
        this.args = clause_args;
        this.out = this.name.out + this.args.out;
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
