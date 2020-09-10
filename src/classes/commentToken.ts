export class CommentToken {
    id: string
    out: string
    text: string | undefined;

    constructor(tag: string, resources?: { id: string, text: string }[]) {
        this.id = tag.slice(1)
        this.text = resources?.filter(el => el.id == this.id).pop()?.text
        if (this.text)
            this.out = `${this.text}\n`;
        else
            this.out = "% --- \n"
    }
}