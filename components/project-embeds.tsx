import Image from "next/image"

import { CopyBlock } from "components/copy-block"
import { siteConfig } from "lib/site"

function buildEmbedHtml({
  projectUrl,
  projectName,
  embedSrc,
  width,
  height,
}: {
  projectUrl: string
  projectName: string
  embedSrc: string
  width: number
  height: number
}) {
  return `<a href="${projectUrl}" target="_blank" rel="noreferrer noopener"><img src="${embedSrc}" alt="${projectName} on ${siteConfig.name}" style="width: ${width}px; height: ${height}px;" width="${width}" height="${height}" /></a>`
}

function ProjectEmbeds({
  slug,
  projectName,
}: {
  slug: string
  projectName: string
}) {
  const projectUrl = `${siteConfig.url}/projects/${slug}`

  const groups = [
    {
      title: "License",
      kind: "license",
      width: 160,
      height: 28,
    },
    {
      title: "Added to",
      kind: "added",
      width: 200,
      height: 28,
    },
  ] as const

  const themes = [
    { id: "light", label: "Light" },
    { id: "dark", label: "Dark" },
  ] as const

  return (
    <section className="mt-10">
      <h2 className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Embeds
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Add interesting embeds to your website or README.
      </p>

      <div className="flex flex-col gap-8">
        {groups.map((group) => (
          <div key={group.kind}>
            <h3 className="mb-3 text-sm font-medium">{group.title}</h3>
            <div className="flex flex-col gap-4">
              {themes.map((theme) => {
                const previewSrc = `/embed/${slug}/${group.kind}/${theme.id}/opengraph-image`
                const embedSrc = `${siteConfig.url}/embed/${slug}/${group.kind}/${theme.id}/${group.kind}.png`

                return (
                  <div
                    key={`${group.kind}-${theme.id}`}
                    className="overflow-hidden rounded-xl border"
                  >
                    <div className="flex items-center justify-between gap-3 border-b bg-muted/40 px-4 py-3">
                      <span className="text-sm font-medium">{theme.label}</span>
                      <a
                        href={projectUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-block transition-opacity hover:opacity-80"
                      >
                        <Image
                          src={previewSrc}
                          alt={`${projectName} on ${siteConfig.name}`}
                          width={group.width}
                          height={group.height}
                          unoptimized
                          className="h-7 w-auto"
                        />
                      </a>
                    </div>
                    <div className="p-3">
                      <CopyBlock
                        code={buildEmbedHtml({
                          projectUrl,
                          projectName,
                          embedSrc,
                          width: group.width,
                          height: group.height,
                        })}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export { ProjectEmbeds }
