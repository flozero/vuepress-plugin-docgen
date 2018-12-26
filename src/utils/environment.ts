import { IDocgenOptions } from '../types'

export const setDefaultOptions = (options: IDocgenOptions) => {
  options.rootDir = options.rootDir || process.cwd()
  if (!options.rootDir) {
    return
  }
}
