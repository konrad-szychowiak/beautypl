"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentToken = void 0;
var CommentToken = /** @class */ (function () {
    function CommentToken(tag, resources) {
        var _this = this;
        var _a;
        this.id = tag.slice(1);
        this.text = (_a = resources === null || resources === void 0 ? void 0 : resources.filter(function (el) { return el.id == _this.id; }).pop()) === null || _a === void 0 ? void 0 : _a.text;
        if (this.text)
            this.out = this.text + "\n";
        else
            this.out = "% --- \n";
    }
    return CommentToken;
}());
exports.CommentToken = CommentToken;
