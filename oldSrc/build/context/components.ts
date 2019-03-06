import * as path from 'path'
import {
  IDirContext,
  IComponentFileContext,
  IComponentContext,
} from '../../types'
import {
  extractFileExtension,
  getFilePathnamesWithFilter,
  extractFileName,
} from '../../utils/file'
// import { camelToHyphen } from '../../utils/common'

const isVueFile = (pathname: string): boolean => {
  return extractFileExtension(pathname) === 'vue'
}

export const buildLink = ({
  // name,
  relativePathname,
  distDirPrefix,
}: {
  name?: string
  relativePathname: string
  distDirPrefix: string
}): string => {
  // const slug = camelToHyphen(name)
  const pathnamelist = relativePathname.split('/')
  pathnamelist.pop()

  // return `/${path.join(distDirPrefix, ...pathnamelist, slug)}/`
  return `/${path.join(distDirPrefix, ...pathnamelist)}/`
}

const buildDocgenPathname = ({
  dirContext,
  link,
}: {
  dirContext: IDirContext
  link: string
}): string => {
  return path.join(dirContext.docgenDir, link).replace(/\/$/, '') + '.md'
}

export const buildComponentContext = ({
  dirContext,
  componentFileContext,
}: {
  dirContext: IDirContext
  componentFileContext: IComponentFileContext
}): IComponentContext => {
  const link = buildLink({
    ...componentFileContext,
    distDirPrefix: dirContext.prefix,
  })

  const docgenPathname = buildDocgenPathname({ dirContext, link })

  return {
    ...componentFileContext,
    link,
    docgenPathname,
    existDocs: false,
  }
}

export const buildComponentFileContext = ({
  rootDir,
  absolutePathname,
}: {
  rootDir: string
  absolutePathname: string
}): IComponentFileContext => {
  const relativePathname = absolutePathname.replace(rootDir, '')
  const fileName = extractFileName(relativePathname) as string
  const dirName = relativePathname.replace(fileName, '')
  const name = fileName.split('.').shift() as string
  return {
    absolutePathname,
    relativePathname,
    dirName,
    fileName,
    name,
  }
}

export const divideByDirectory = ({
  filePathnames,
  rootDir,
}: {
  filePathnames: string[]
  rootDir: string
}): Map<string, IComponentFileContext[]> => {
  const map = new Map()
  filePathnames
    .map((pathname: string) => {
      return buildComponentFileContext({ rootDir, absolutePathname: pathname })
    })
    .forEach(context => {
      const { dirName } = context
      const contextsInDir = map.get(dirName) || []
      contextsInDir.push(context)
      map.set(dirName, contextsInDir)
    })

  return map
}

export default ({ dirContext }: { dirContext: IDirContext }) => {
  const { rootDir, include, exclude } = dirContext
  const vueFilePathnames = getFilePathnamesWithFilter(rootDir, {
    include,
    exclude,
  }).filter(isVueFile)

  const fileContextMap = divideByDirectory({
    filePathnames: vueFilePathnames,
    rootDir,
  })

  const componentContextMap = new Map()
  for (const [dirName, fileContexts] of fileContextMap.entries()) {
    const componentContexts = fileContexts.map(
      (componentFileContext: IComponentFileContext) => {
        return buildComponentContext({ dirContext, componentFileContext })
      },
    )
    componentContextMap.set(dirName, componentContexts)
  }

  return componentContextMap
}
