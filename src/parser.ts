import fs from 'fs';
import create_token, {
    ClauseToken,
    FArgsToken,
    ListToken,
    RHeadToken,
    SeparatorToken,
    TagToken,
    Token
} from "./classes/tokens";

const file = fs.readFileSync('./test_data/in.pro', 'utf8');

type Stack = Array<Token>

let _stack: Stack = []

function shrink(stack: Stack, to: string, token_constructor: typeof ListToken | typeof FArgsToken): Stack {
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
}

function join_tag_params(stack: Stack, token_constructor: typeof ClauseToken): Stack {
    const args: FArgsToken = <FArgsToken>stack.pop()
    const functor: TagToken = <TagToken>stack.pop()

    stack.push(new token_constructor(functor, args))
    stack.push(new SeparatorToken(':-'))
    return stack
}

// TODO: add rule body parsing
// function collect_rule_body(_stack: Stack) {
//     return undefined;
// }

// TODO: inline arguments to function arguments
file
    .replace(/^%.*$/g, match => match + '.')
    .replace(/([|!*=<>:+\-\\\/]+|[%.,[\]()])/g, match => ` ${match} `)
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
            // case '.': _stack = collect_rule_body(_stack, )
            default:
                _stack.push(create_token(el))
        }
        return el
    })


console.log(_stack)

fs.writeFileSync('./test_data/out.json', JSON.stringify(_stack))
fs.writeFileSync('./test_data/out.pro', _stack.map(el => el.out).join(" ").replace(/\.\s+/g, ".\n"))
