import {v4} from "uuid";
import {OperatorToken, TagToken} from "./tagToken";
import {FArgsToken} from "./groupToken";
import {Token} from "./tokens";

export class ClauseToken {
    name: TagToken;
    args?: FArgsToken;
    out: string;
    id: string;

    constructor(clause_name: TagToken, clause_args?: FArgsToken) {
        this.id = v4()
        this.name = clause_name
        this.args = clause_args
        this.out = this.name.out + this.args?.out
    }
}

export class RHeadToken extends ClauseToken {
}

export class MathsToken extends ClauseToken {
    out: string;
    private readonly _args: [Token, Token];

    constructor(name: OperatorToken, args: [Token, Token], infix: boolean = true) {
        super(name);
        this._args = args
        if (infix) {
            this.out =this._args[0].out + this.name.out + this._args[1].out
        } else {
            this.out = this.name.out + "(" + this._args[0].out + ", " + this._args[1].out + ")"
        }
    }
}