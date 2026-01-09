"use client"

import * as React from "react"
import { Search } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

const SEARCH_SHORTCUT_KEY = "k"
const SEARCH_INPUT_ID = "app-header-search"
const EDITABLE_SELECTOR = "input, textarea, select, [contenteditable]"

function shouldIgnoreShortcut(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.id === SEARCH_INPUT_ID) {
    return false
  }

  return !!target.closest(EDITABLE_SELECTOR)
}

export function HeaderSearch() {
  const [shortcutLabel, setShortcutLabel] = React.useState("⌘K")

  React.useEffect(() => {
    const isMac = /Mac|iPod|iPhone|iPad/.test(window.navigator.platform)
    setShortcutLabel(isMac ? "⌘K" : "Ctrl K")

    const handleKeyDown = (event: KeyboardEvent) => {
      const modifierPressed = isMac ? event.metaKey : event.ctrlKey
      if (
        modifierPressed &&
        event.key.toLowerCase() === SEARCH_SHORTCUT_KEY &&
        !shouldIgnoreShortcut(event.target)
      ) {
        event.preventDefault()
        const input = document.getElementById(
          SEARCH_INPUT_ID
        ) as HTMLInputElement | null
        if (input) {
          input.focus({ preventScroll: true })
          input.select()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <InputGroup>
      <InputGroupInput id={SEARCH_INPUT_ID} placeholder="Search..." />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <span className="shortcut end-3 bg-card">{shortcutLabel}</span>
      </InputGroupAddon>
    </InputGroup>
  )
}
