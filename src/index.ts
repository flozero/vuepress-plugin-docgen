import { NAME } from './constants'
import { IDocgenOptions, IVuePressOpenContext } from './types'
import { setDefaultOptions } from './utils/environment'
import logger from './utils/logger'
import { buildDirContext } from './build/context'

module.exports = (options: IDocgenOptions, ctx: IVuePressOpenContext) => {
  setDefaultOptions(options)
  if (typeof options.rootDir !== 'string') {
    logger.error(
      new Error(
        'Please set rootDir option. Because automatic project scan failed.',
      ),
    )
    process.exit(1)
  }

  const dirContext = buildDirContext({
    rootDir: options.rootDir as string,
    include: options.include,
    exclude: options.exclude,
    prefix: options.prefix,
    ctx,
  })

  console.log({ dirContext })

  return {
    name: NAME,
  }
}
