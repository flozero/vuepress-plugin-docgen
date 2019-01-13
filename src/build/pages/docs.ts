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
  const preview = docsBlock.content.replace(/(\r\n|\n|\r)/gm, '')
  docs +=
    docsBlock === null
      ? ''
      : `## Code\n\n\`\`\`html\n${preview}\n\`\`\`\n\n## Preview\n${
          docsBlock.content
        }`

  return {
    path: context.link,
    content: docs,
  }
}
