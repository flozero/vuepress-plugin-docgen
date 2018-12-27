import { NAME } from './constants'
import { IDocgenOptions, IVuePressOpenContext } from './types'
import { setDefaultOptions } from './utils/environment'
import logger from './utils/logger'
import {
  buildDirContext,
  buildComponentContext,
  buildPages,
  buildPlugins,
  buildWebpackConfig,
} from './build'
import { removeDir } from './utils/file'

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

  console.log(componentContextMap)

  removeDir(dirContext.docgenDir)

  // TODO: Watch & update

  return {
    name: NAME,
    plugins: buildPlugins({ dirContext }),
    chainWebpack: config => {
      buildWebpackConfig({ config })
    },
    async additionalPages() {
      const pages = await buildPages({ dirContext, componentContextMap })
      return pages
    },
  }
}
