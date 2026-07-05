"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "lib/utils"

function CopyBlock({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable — silently ignore.
    }
  }

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="text-muted-foreground hover:bg-background hover:text-foreground absolute top-2 right-2 flex size-7 items-center justify-center rounded-md border bg-transparent transition-colors"
      >
        {copied ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
      <pre className="bg-muted text-muted-foreground overflow-x-auto rounded-lg p-4 pr-12 text-xs">
        {code}
      </pre>
    </div>
  )
}

export { CopyBlock }
