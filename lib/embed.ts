import { parseGithubRepo } from "lib/github"
import { siteConfig } from "lib/site"
import { type Project } from "components/projects-grid"

export type EmbedTheme = "light" | "dark"

const themes = {
  light: {
    background: "#ffffff",
    border: "#D0D5DD",
    text: "#101828",
  },
  dark: {
    background: "#171717",
    border: "#344054",
    text: "#F9FAFB",
  },
} as const

async function fetchProjectLicense(
  githubUrl: string | undefined
): Promise<string | null> {
  if (!githubUrl) {
    return null
  }

  const repo = parseGithubRepo(githubUrl)
  if (!repo) {
    return null
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "force-cache",
    })
    if (!res.ok) {
      return null
    }

    const data = (await res.json()) as {
      license?: { spdx_id?: string | null } | null
    }
    const spdx = data.license?.spdx_id
    if (!spdx || spdx === "NOASSERTION") {
      return null
    }
    return spdx
  } catch {
    return null
  }
}

async function getEmbedText(project: Project): Promise<string> {
  const license = await fetchProjectLicense(project.socials?.github)
  if (license) {
    return `License: ${license}`
  }
  return `Featured on: ${siteConfig.name}`
}

function getEmbedTheme(theme: EmbedTheme) {
  return themes[theme]
}

export { fetchProjectLicense, getEmbedText, getEmbedTheme, themes }
