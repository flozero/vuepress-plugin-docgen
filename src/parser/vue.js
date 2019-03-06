const { parse, SFCDescriptor, SFCCustomBlock } = require('@vue/component-compiler-utils')
const compiler = require('vue-template-compiler')
  
module.exports = class VueParser {
  
    constructor({ source, fileName }) {
      this.descriptor = parse({
        source,
        compiler,
        filename: fileName,
      })
    }
  
    getCustomBlock(blockName) {
      return (
        this.descriptor.customBlocks.find(block => block.type === blockName) ||
        null
      )
    }
}
  