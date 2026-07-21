"use client"

import * as React from "react"
import { Star } from "lucide-react"

const REPO = "EmbedCatalog/embedcatalog"

function GithubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.086 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.42-1.305.762-1.605-2.665-.303-5.466-1.334-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.216.694.825.576C20.565 22.296 24 17.797 24 12.5 24 5.87 18.627.5 12 .5z" />
    </svg>
  )
}

function formatStars(count: number) {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`
  }
  return String(count)
}

function GithubStars() {
  const [stars, setStars] = React.useState<number | null>(null)

  React.useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(`https://api.github.com/repos/${REPO}`, {
          headers: { Accept: "application/vnd.github+json" },
          cache: "no-store",
        })
        if (!res.ok) {
          return
        }
        const data = (await res.json()) as { stargazers_count?: number }
        if (!cancelled && typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count)
        }
      } catch {
        // ignore network errors, keep icon-only state
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Star the project on GitHub"
      className="text-muted-foreground hover:bg-accent hover:text-foreground flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-sm font-medium transition-colors"
    >
      <GithubIcon className="size-4" />
      {stars !== null && (
        <>
          <Star className="size-3.5" />
          <span className="tabular-nums">{formatStars(stars)}</span>
        </>
      )}
    </a>
  )
}

export { GithubStars }
