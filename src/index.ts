import Controller from './Controller'
import { Block } from './types'
import { invariant, query } from './utils'

type Options = {
  immediate: boolean
}

export function register (
  block: Block,
  domNode: string | HTMLElement,
  options?: Options
) {
  const element = query(domNode)
  const { immediate = true } = options ?? {}

  invariant(!element, `element with selector ${domNode} not found`)

  const controller = new Controller(element, block)
  controller.init()

  if (immediate) controller.initRx()
}

export { Block }
