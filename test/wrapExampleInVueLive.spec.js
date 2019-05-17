/* eslint-disable */

const { expect } = require('chai')
const path = require('path')
const fs = require('fs')

const wrapExampleInVueLive = require('../src/utils/wrapExampleInVueLive')
const markdown = fs.readFileSync(
    path.join(__dirname, './dirData/testWrap.md'),
    'utf8',
)

describe('wrapExampleInVueLive', function() {
    it('should return a wrapped version of the code', function() {
        expect(wrapExampleInVueLive(markdown)).to.contain('```jsx live')
    })
})
