
import { EventEmitter } from 'events'

const NAVIGATION_REG = /^Enter|(Arrow(Up|Right|Down|Left))$/

export const NavEnter = 'Enter'
export const NavLeft = 'ArrowLeft'
export const NavRight = 'ArrowRight'
export const NavUp = 'ArrowUp'
export const NavDown = 'ArrowDown'

/**
 * Exports the navKey emitter
 * (when user click on directional arrows or Enter).
 */
export const navEmitter = new EventEmitter

const keydown = ({ key }) => NAVIGATION_REG.test(key)
  && navEmitter.emit('NavKey', key)

document.addEventListener('keydown', keydown, false)
