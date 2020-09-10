import fs from 'fs';
import {applyRuleToken, CommentToken, NullToken} from "./classes";
const file = fs.readFileSync('J.pro','utf8');

const content = file
    .replace(/%[ \t\S]*\n/g, match => ("__comment__(" + match.match(/(\w+)/g)?.join(" ") + "). "))
    .split(/\./g)
    .map(el => {
        const line = el.match(/([a-zA-Z0-9_]+|:-|>=|=<|[\/*]+|[\[\]\(\)\-,.!\/*+<>])/g) || [];
        if (line.includes("__comment__")) return new CommentToken(line)
        else return applyRuleToken(line)
    })
    .map(el => el.output())
    .map(el => {
        console.log(el)
    })

// const config = {
//     word: /([a-zA-Z0-9_]+/,
//     operator: /a/g
// }