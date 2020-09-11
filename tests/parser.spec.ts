import {ListToken, SeparatorToken, TagToken, Token} from "../src/classes/tokens";
import {shrink} from "../src/parser";


test('re-stacking a list', () => {
    const test_stack: Array<Token> = []
    test_stack.push(new SeparatorToken('['))
    test_stack.push(new TagToken('Tag'))

    console.log(
        shrink(test_stack, '[', ListToken)
    )

    expect(shrink(test_stack, '[', ListToken)).toBeInstanceOf(Array)
})