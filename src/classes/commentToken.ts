import {v4} from "uuid";

export class CommentToken {
    name: string
    arguments: Array<string>
    id: string
    out: string

    constructor(text: string[]) {
        this.id = v4();
        this.name = '%';
        this.arguments = text.slice(2, -2);
        this.out = `${this.name} ${this.arguments.join(" ")}`;
    }
}