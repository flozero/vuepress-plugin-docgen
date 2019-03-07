/* eslint-disable */

const {expect} = require('chai');

const logger = require("../src/utils/logger")

const { hasKey, buildGlobalContext} = require('../src/builders/context');

const path = require("path");

logger.pause()

console.log(__dirname)

describe("hasKey()", function() {
    it("should return false if key doesnt exist inside an object", function() {
        expect(hasKey({"bla": "hello"}, "hey")).to.be.false
    })

    it("should return true if key exist inside an object", function() {
        expect(hasKey({"hey": "hello"}, "hey")).to.be.true
    })
})

describe("buildGlobalContext()", function() {
    let options = {
        debug: true,
        sideBarName: '/components/',
        rootDir: path.join(__dirname, "./dirData/fakeDirComponent")
    }

    it("should return the good object", function() {
        
    })

})