import {v4 as uuid} from "uuid";

export class TagToken {
    out: string;
    id: string;
    protected name: string;

    constructor(word: string) {
        this.id = uuid()
        this.name = word
        this.out = word
    }
}

export class VariableToken extends TagToken {
}

export class SeparatorToken extends TagToken {
    constructor(word: string) {
        super(word);
        this.out = this.out + " "
    }

}

export class OperatorToken extends TagToken {
    constructor(word: string) {
        super(word);
        this.out = ` ${this.name} `
    }
}
