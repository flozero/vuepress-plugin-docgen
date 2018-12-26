export interface IVuePressOpenContext {
  isProd: boolean
  sourceDir: string
  tempPath: string
  outDir: string
  themePath: string
  base: string
  writeTemp: string
}

export interface IVuePressPage {
  path: string
  filePath?: string
  content?: string
}

export interface IVuePressComponent {
  name: string
  path: string
}
