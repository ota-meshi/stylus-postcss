"use strict"

const assert = require("assert")
const postcss = require("postcss")

const stylusPostcss = require("../")

it("try", () => {
    const result = postcss().process(
        //
        `

unless disable-padding-override is defined and disable-padding-override
    padding(x, y)
        margin y x

body
    apply-mixins = true
    pad(padding, 10) if apply-mixins
`,
        { syntax: stylusPostcss }
    ).root
    assert.strictEqual(typeof result, "object")
    assert.strictEqual(result.toString(), "")
})

it("parse stylus as postcss syntax", () => {
    const result = postcss().process(
        `
body
    font 14px/1.5 Helvetica, arial, sans-serif
    button
    button.button
    input[type='button']
    input[type='submit']
        border-radius 5px
`,
        { syntax: stylusPostcss }
    ).root
    assert.strictEqual(typeof result, "object")
    assert.strictEqual(
        result.toString(),
        `
body{
    font: 14px/1.5 Helvetica, arial, sans-serif;
    button
    ,button.button
    ,input[type='button']
    ,input[type='submit']{
        border-radius: 5px}}
`
    )
})

it("parse css as postcss syntax", () => {
    const result = postcss().process(
        `
body {
    font: 14px/1.5 Helvetica, arial, sans-serif;
}
body button,
body button.button,
body input[type='button'],
body input[type='submit'] {
    border-radius: 5px;
}
`,
        { syntax: stylusPostcss }
    ).root
    assert.strictEqual(typeof result, "object")
    assert.strictEqual(
        result.toString(),
        `
body {
    font: 14px/1.5 Helvetica, arial, sans-serif;
}
body button,
body button.button,
body input[type='button'],
body input[type='submit'] {
    border-radius: 5px;
}
`
    )
})
