import * as path from 'path'

export default ({ config }: { config: any }) => {
  const loaderPath = path.resolve(__dirname, './loader.js')
  config.module
    .rule('docs')
    .oneOf('docs')
    .resourceQuery(/blockType=docs/)
    .use('through-loader')
    .loader(require.resolve(loaderPath))
    .end()
}
