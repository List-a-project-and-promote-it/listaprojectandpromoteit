import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { type Project } from "components/projects-grid"
import projectsData from "data/projects.json"
import {
  embedKinds,
  embedThemes,
  getEmbedSize,
  getEmbedText,
  getEmbedTheme,
  type EmbedKind,
  type EmbedTheme,
} from "lib/embed"
import { siteConfig } from "lib/site"

const projects = projectsData as Project[]

export const dynamic = "force-static"
export const alt = "EmbedCatalog embed"
export const contentType = "image/png"

export function generateStaticParams() {
  return projects.flatMap((project) =>
    embedKinds.flatMap((kind) =>
      embedThemes.map((theme) => ({
        slug: project.slug,
        kind,
        theme,
      }))
    )
  )
}

export default async function EmbedImage({
  params,
}: {
  params: Promise<{ slug: string; kind: string; theme: string }>
}) {
  const { slug, kind: kindParam, theme: themeParam } = await params
  const kind: EmbedKind = kindParam === "added" ? "added" : "license"
  const theme: EmbedTheme = themeParam === "dark" ? "dark" : "light"
  const size = getEmbedSize(kind)
  const project = projects.find((item) => item.slug === slug)
  const text = project
    ? await getEmbedText(project, kind)
    : kind === "added"
      ? `Added to: ${siteConfig.name}`
      : "License: Unknown"
  const colors = getEmbedTheme(theme)

  const font = await readFile(
    join(process.cwd(), "assets/fonts/Geist-SemiBold.ttf")
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.background,
          border: `1px solid ${colors.border}`,
          borderRadius: 4,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            color: colors.text,
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "Geist SemiBold",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist SemiBold",
          data: font,
          style: "normal",
          weight: 600,
        },
      ],
    }
  )
}
