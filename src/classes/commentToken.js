"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentToken = void 0;
var uuid_1 = require("uuid");
var CommentToken = /** @class */ (function () {
    function CommentToken(text) {
        this.id = uuid_1.v4();
        this.name = '%';
        this.arguments = text.slice(2, -2);
        this.out = this.name + " " + this.arguments.join(" ");
    }
    return CommentToken;
}());
exports.CommentToken = CommentToken;
