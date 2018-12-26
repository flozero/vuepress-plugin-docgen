import * as consola from 'consola'
import { NAME } from '../constants'

// @ts-ignore: TS2339
const logger = consola.create({
  defaults: {
    tag: NAME,
  },
})

export default logger
