export interface IDirContext {
  rootDir: string
  sourceDir: string
  configDir: string
  include: string[]
  exclude: string[]
  docgenDir: string
  prefix: string
}

export interface IComponentFileContext {
  name: string
  fileName: string
  dirName: string
  absolutePathname: string
  relativePathname: string
}

export interface IComponentContext extends IComponentFileContext {
  link: string
  docgenPathname: string
  existDocs: boolean
}
