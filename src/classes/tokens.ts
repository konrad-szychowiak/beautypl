import {v4 as uuid} from "uuid";
import {ClauseToken, MathsToken, RHeadToken} from "./clauseToken";
import {CommentToken} from "./commentToken";
import {OperatorToken, SeparatorToken, TagToken, VariableToken} from "./tagToken";
import {FArgsToken, GroupingToken, ListToken, RBodyToken} from "./groupToken";

export class FactToken {

    name: string
    arguments: Array<string | Token>
    id: string

    constructor(text: Array<string>) {
        this.name = text[0]
        this.arguments = text.slice(2, -1)
        this.id = uuid()
    }

    output = (): string => `${this.name}(${this.arguments.join("").replace(/,/g, ", ")}). % fact`;
}


export {
    ListToken,
    CommentToken,
    FArgsToken,
    ClauseToken,
    RHeadToken,
    TagToken,
    VariableToken,
    OperatorToken,
    SeparatorToken,
    MathsToken,
    RBodyToken
}
export type Token =
    GroupingToken
    | CommentToken
    | ClauseToken
    | VariableToken
    | TagToken
    | OperatorToken
    | SeparatorToken
    | MathsToken
    | RBodyToken
export default function (word: string, resources?: { id: string, text: string }[]): Token {
    if (/^[A-Z][\w_ąęółśźż]*$/.test(word)) return new VariableToken(word)
    if (/^%/.test(word)) return new CommentToken(word, resources)
    if (word === ',') return new SeparatorToken(word)
    if (/^(div|is|[*=<>+\-\\\/]+)$/.test(word)) return new OperatorToken(word)
    return new TagToken(word)
}
