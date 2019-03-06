const {expect} = require('chai')
const {founded, goodTyped, isOptValid, options} = require("../../src/utils/options");
const logger = require("../../src/utils/logger")


// disable error log provide by parsers for readability of tests. Comment if you want full logs
logger.pause()

describe("founded()", function() {
    it('should return false when useless key is found', function() {
        expect(founded('type', {type: "bonjour"})).to.be.false
    })
    it('should return true when key is found', function() {
        expect(founded('rootDir', {rootDir: "bonjour"})).to.be.true
    })
})

describe("goodTyped()", function() {
    it('should return false when key is not good typed', function() {
        expect(goodTyped('rootDir', {'rootDir': {}})).to.be.false
    })
    it('should return true when key is well typed', function() {
        expect(goodTyped('rootDir', {'rootDir': 'asdasdklaj'})).to.be.true
    })
})

describe("isOptValid()", function() {
    it('should return false when one found is false', function() {
        let fail = options
        fail['rootDir'].found = false
        expect(isOptValid(fail)).to.be.false
    })
    it('should return true when all found are true', function() {
        let ok = options
        ok['rootDir'].found = true
        expect(isOptValid(ok)).to.be.true
    })
})