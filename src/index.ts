import { NAME } from './constants'
import { IDocgenOptions, IVuePressOpenContext } from './types'
import { setDefaultOptions } from './utils/environment'
import logger from './utils/logger'
import { buildDirContext, buildComponentContext } from './build/context'

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

  const componentContextMap = buildComponentContext({
    dirContext,
  })

  for (const x of componentContextMap) {
    console.log(x)
  }

  return {
    name: NAME,
  }
}
