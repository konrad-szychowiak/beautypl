import {v4} from "uuid";
import {TagToken} from "./tagToken";
import {FArgsToken} from "./groupToken";

export class ClauseToken {
    name: TagToken;
    args: FArgsToken;
    out: string;
    id: string;

    constructor(clause_name: TagToken, clause_args: FArgsToken) {
        this.id = v4()
        this.name = clause_name
        this.args = clause_args
        this.out = this.name.out + this.args.out
    }
}

export class RHeadToken extends ClauseToken {}