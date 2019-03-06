import {
  parse,
  SFCDescriptor,
  SFCCustomBlock,
} from '@vue/component-compiler-utils'
import * as compiler from 'vue-template-compiler'

export default class VueParser {
  private descriptor: SFCDescriptor

  constructor({ source, fileName }: { source: string; fileName: string }) {
    this.descriptor = parse({
      source,
      compiler,
      filename: fileName,
    })
  }

  getCustomBlock(blockName: string): SFCCustomBlock | null {
    return (
      this.descriptor.customBlocks.find(block => block.type === blockName) ||
      null
    )
  }
}
