const consola = require('consola')
const { NAME } = require('../constants')

const logger = consola.create({
  defaults: {
    tag: NAME,
  },
})

module.exports = logger