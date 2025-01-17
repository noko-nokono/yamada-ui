import type { ComponentType } from "react"
import type {
  DOMElement,
  HTMLUIComponents,
  StyledOptions,
  UIFactory,
} from "./components"
import { styled } from "./styled"

interface Factory extends UIFactory, HTMLUIComponents {}

function factory() {
  const cache = new Map<DOMElement, ComponentType>()

  return new Proxy(styled, {
    apply: (_target, _thisArg, [el, options]: [DOMElement, StyledOptions]) => {
      return styled(el, options)
    },

    get: (_target, el: DOMElement) => {
      if (!cache.has(el)) cache.set(el, styled(el))

      return cache.get(el)
    },
  }) as Factory
}

/**
 * `ui` is an object of JSX elements enabled with Yamada UI's style system,
 * and can also be used as a function for custom components to receive Yamada UI's style system.
 *
 * @see Docs https://yamada-ui.com/styled-system/ui
 */
export const ui = factory()
