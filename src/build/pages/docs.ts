import { parse } from 'vue-docgen-api'
import { readFile } from '../../utils/file'
import { IComponentContext, IVuePressPage } from '../../types'
import { DocsParser, VueParser } from '../../parse'

export default ({ context }: { context: IComponentContext }): IVuePressPage => {
  const componentInfo = parse(context.absolutePathname)
  let docs = DocsParser(componentInfo)

  const source = readFile(context.absolutePathname)
  const vueParser = new VueParser({ source, fileName: context.fileName })

  const docsBlock = vueParser.getCustomBlock('docs')
  context.existDocs = docsBlock !== null
  docs += docsBlock === null ? '' : `## Example\n${docsBlock.content}`

  return {
    path: context.link,
    content: docs,
  }
}
