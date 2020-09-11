import fs from 'fs';
import create_token, {
    ClauseToken,
    FArgsToken,
    ListToken,
    MathsToken,
    OperatorToken,
    RBodyToken,
    RHeadToken,
    SeparatorToken,
    TagToken,
    Token
} from "./classes/tokens";
import {v4} from "uuid";

const file = fs.readFileSync('./test_data/in.pro', 'utf8');

type Stack = Array<Token>
let _stack: Stack = []
let _comments: { id: string, text: string }[] = []

export const shrink = (stack: Stack, to: string, token_constructor: typeof ListToken | typeof FArgsToken): Stack => {
    let params: Stack;
    params = [];
    while (stack && stack[stack.length - 1].out != to) {
        const el = stack.pop() as Token
        params.push(el)
    }
    if (stack) {
        stack.pop()
        const new_token = new token_constructor(params)
        stack.push(new_token)
        return stack
    } else throw 'Stack is empty!'
};

function join_tag_params(stack: Stack, token_constructor: typeof ClauseToken): Stack {
    const args: FArgsToken = <FArgsToken>stack.pop()
    const functor: TagToken = <TagToken>stack.pop()

    stack.push(new token_constructor(functor, args))
    stack.push(new SeparatorToken(':-'))
    return stack
}

// FIXME: something doesn't work here
const collect_rule_body = (stack: Stack): Stack => {
    let body: Stack = [];
    while (stack.length > 1 && stack[stack.length - 1].out !== ':-' && stack[stack.length - 1].out !== '.') {
        const el = stack.pop() as Token

        if (el instanceof OperatorToken) {
            const a: Token = body.pop() as Token
            const b: Token = stack.pop() as Token

            console.log("a, b", a, b)

            const func: MathsToken = new MathsToken(el as OperatorToken, [b, a])

            // console.error("rule body func: ", func)
            body.push(func)
        } else if (el instanceof FArgsToken) {
            let n = stack.pop() as TagToken
            body.push(new ClauseToken(n, el))
        } else if (el instanceof SeparatorToken) {
        } else {
            // console.error("rule body el: ", el)
            body.push(el)
        }
    }

    body = body.reverse()

    fs.writeFileSync('./test_data/out.log', body.map(el => el.out).join("").replace(/\.\s*/g, ".\n"))

    stack = [...stack, new RBodyToken(body), new SeparatorToken('.')]
    return stack
};

// TODO: inline arguments to function arguments
file
    .replace(/^%.*$/gm, match => {
        const id = v4().replace(/-/g, "%");
        const text = match
        _comments.push({id: id, text: text})
        return "%" + id
    })
    .replace(/([|!*=<>:+\-\\\/]+|[.,[\]()])/g, match => ` ${match} `)
    .replace(/\s+/g, " ")
    .split(' ')
    .map(el => {
        switch (el) {
            case ']':
                _stack = shrink(_stack, '[', ListToken);
                break;
            case ')':
                _stack = shrink(_stack, '(', FArgsToken);
                break;
            case ':-':
                _stack = join_tag_params(_stack, RHeadToken);
                break;
            // case '.':
            //     _stack = collect_rule_body(_stack);
            //     break;
            default:
                _stack.push(create_token(el, _comments))
        }
        return el
    })

fs.writeFileSync('./test_data/out.json', JSON.stringify(_stack.map(el => el.out)))
fs.writeFileSync('./test_data/out.pro', _stack.map(el => el.out).join(" ").replace(/\.\s+/g, ".\n"))
