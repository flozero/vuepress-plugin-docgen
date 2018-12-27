import { IDirContext, IComponentContext, IVuePressPage } from '../../types'
import { buildIndexPageMarkdown } from './index-page-builder'
import { default as buildDocsPage } from './docs'

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

const buildComponentPages = async ({
  componentContextMap,
}: {
  componentContextMap: Map<string, IComponentContext[]>
}) => {
  let pagesPromise: Promise<IVuePressPage>[] = []
  for (const componentContexts of componentContextMap.values()) {
    const componentPages = componentContexts.map(context => {
      return buildDocsPage({ context })
    })

    pagesPromise = pagesPromise.concat(componentPages)
  }
  const pages = await Promise.all(pagesPromise)
  return pages
}

export default async ({
  dirContext,
  componentContextMap,
}: {
  dirContext: IDirContext
  componentContextMap: Map<string, IComponentContext[]>
}): Promise<IVuePressPage[]> => {
  const indexPage = buildIndexPage({ dirContext, componentContextMap })
  const componentPages = await buildComponentPages({ componentContextMap })
  return [indexPage, ...componentPages]
}
