const {
    extractRelativePath,
    extractDirPathFromFile,
    getFileNameFromAbsolutePath
} = require("../src/extractors/pathReader");
const {expect} = require('chai')

const logger = require("../src/utils/logger")

// disable error log provide by parsers for readability of tests. Comment if you want full logs
logger.pause()

describe("extractRelativePath()", function() {
    it("should extract relative path from two path", () => {
      const path = "/home/test/help.vue"  
      const basePath = "/home"
    
      expect(extractRelativePath(basePath, path)).to.equal("test/help.vue")
    })
})


describe("extractDirPathFromFile()", function() {
    it("should extract relative path from two path", () => {
      const path = "/home/test/help.vue"  
    
      expect(extractDirPathFromFile(path)).to.equal('/home/test')
    })
})


describe("getFileNameFromAbsolutePath()", function() {
    it("should extract relative path from two path", () => {
      const path = "/home/test/help.vue"  
    
      expect(getFileNameFromAbsolutePath(path)).to.equal('help.vue')
    })
})
