import {v4 as uuid} from "uuid";

// interface Token {
//     label: string
//     contents: string[]
//     output: () => string
// }

// class PrototypeToken {
//     label: string
//     contents: string[]
//     output: () => string
//     id: number
// }

export class CommentToken {
    name: string
    arguments: Array<string>
    id: string

    constructor(text: Array<string>) {
        this.name = '%'
        this.arguments = text.slice(2, -2)
        this.id = uuid()
    }

    output = (): string => {
        return `${this.name} ${this.arguments.join(" ")}`
    };
}

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

export function applyRuleToken (token: Array<string>): Token {
    if (token.includes(':-')) {
        return new NullToken()
    }
    return new FactToken(token)
}

export class NullToken {
    // id: string
    constructor() {
        // this.id = uuid()
    }
    output = ():string  => "%-- NullToken --% "
}

export type Token = CommentToken | FactToken | NullToken
