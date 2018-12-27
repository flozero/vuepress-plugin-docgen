import { parse } from 'vue-docgen-api'
import { IComponentContext, IVuePressPage } from '../../types'
import parseDoc from '../../parse/docs'

export default async ({
  context,
}: {
  context: IComponentContext
}): Promise<IVuePressPage> => {
  const componentInfo = parse(context.absolutePathname)
  const content = parseDoc(componentInfo)
  console.log({ content })
  return {
    path: context.link,
    content,
  }
}
