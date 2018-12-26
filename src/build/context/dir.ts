import * as path from 'path'
import { IVuePressOpenContext } from '../../types'
import { DEFAULT_PREFIX, EXCLUDE } from '../../constants'

export default ({
  rootDir,
  include = [],
  exclude = [],
  prefix,
  ctx,
}: {
  rootDir: string
  include?: string | string[]
  exclude?: string | string[]
  prefix?: string
  ctx: IVuePressOpenContext
}) => {
  const { sourceDir } = ctx
  const configDir = path.join(sourceDir, '.vuepress')
  const docgenDir = path.join(configDir, '.docgen')
  const distDirPrefix = prefix || DEFAULT_PREFIX
  include = Array.isArray(include) ? include : [include]
  exclude = Array.isArray(exclude) ? exclude : [exclude]
  exclude.push(...EXCLUDE)

  return {
    rootDir,
    sourceDir,
    include,
    exclude,
    configDir,
    docgenDir,
    prefix: distDirPrefix,
  }
}
