import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { type Project } from "components/projects-grid"
import projectsData from "data/projects.json"
import {
  getEmbedText,
  getEmbedTheme,
  type EmbedTheme,
} from "lib/embed"
import { siteConfig } from "lib/site"

const projects = projectsData as Project[]

export const dynamic = "force-static"
export const alt = "EmbedCatalog embed"
export const size = { width: 160, height: 28 }
export const contentType = "image/png"

export function generateStaticParams() {
  return projects.flatMap((project) => [
    { slug: project.slug, theme: "light" },
    { slug: project.slug, theme: "dark" },
  ])
}

export default async function EmbedImage({
  params,
}: {
  params: Promise<{ slug: string; theme: string }>
}) {
  const { slug, theme: themeParam } = await params
  const theme: EmbedTheme = themeParam === "dark" ? "dark" : "light"
  const project = projects.find((item) => item.slug === slug)
  const text = project
    ? await getEmbedText(project)
    : `Featured on: ${siteConfig.name}`
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
