const {dropVueExtension} = require("../src/extractors/name");
const {expect} = require('chai')

const logger = require("../src/utils/logger")

// disable error log provide by parsers for readability of tests. Comment if you want full logs
logger.pause()

describe("dropVueExtension()", function() {
    it("should drop extension from file", function() {
        expect(dropVueExtension("Test.vue")).to.equal('Test')
    })
})