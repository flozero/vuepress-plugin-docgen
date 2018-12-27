import { IDirContext, IComponentContext, IVuePressPage } from '../../types'
import { buildIndexPageMarkdown } from './index-page-builder'

export const buildIndexPage = ({
  dirContext,
  componentContextMap,
}: {
  dirContext: IDirContext
  componentContextMap: Map<string, IComponentContext[]>
}): IVuePressPage => {
  const content = buildIndexPageMarkdown({
    componentContextMap,
  })
  return {
    path: `/${dirContext.prefix}/`,
    content,
  }
}

export default ({
  dirContext,
  componentContextMap,
}: {
  dirContext: IDirContext
  componentContextMap: Map<string, IComponentContext[]>
}): IVuePressPage[] => {
  return [buildIndexPage({ dirContext, componentContextMap })]
}
