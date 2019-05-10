const compiler = require("vue-template-compiler");

module.exports = class VueParser {
  constructor({ source }) {
    this.descriptor = compiler.parseComponent(source);
  }

  getCustomBlock(blockName) {
    return (
      this.descriptor.customBlocks.find(block => block.type === blockName) ||
      null
    );
  }
};
