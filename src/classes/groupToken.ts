import {v4 as uuid} from "uuid";
import {Token} from "./tokens";

export type GroupingToken = GroupToken | ListToken | FArgsToken

class GroupToken {
    id: string
    out: string
    protected start: string
    protected end: string
    protected args: Token[]

    constructor(content: Token[], start: string, end: string) {
        this.id = uuid()
        this.args = content
        this.start = start
        this.end = end
        this.out = this.out = this.start + this.args.map(el => el.out).join("") + this.end

    }
}

export class ListToken extends GroupToken {
    constructor(content: Token[], start?: string, end?: string) {
        super(content, start || '[', end || ']');
        let text_args = this.args.map(el => el.out).join("")
        text_args = /[|,]/.test(text_args) ? ` ${text_args} ` : text_args
        this.out = (this.start + text_args + this.end).replace(/(?<=\[]) (?=\[])/g, "")
    }
}

export class FArgsToken extends GroupToken {
    constructor(content: Token[], start?: string, end?: string) {
        super(content, start || '(', end || ')');
    }
}