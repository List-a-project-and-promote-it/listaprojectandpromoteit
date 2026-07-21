import Image from "next/image"

import { CopyBlock } from "components/copy-block"
import { siteConfig } from "lib/site"

function buildEmbedHtml({
  projectUrl,
  projectName,
  embedSrc,
}: {
  projectUrl: string
  projectName: string
  embedSrc: string
}) {
  return `<a href="${projectUrl}" target="_blank" rel="noreferrer noopener"><img src="${embedSrc}" alt="${projectName} on ${siteConfig.name}" style="width: 160px; height: 28px;" width="160" height="28" /></a>`
}

function ProjectEmbeds({
  slug,
  projectName,
}: {
  slug: string
  projectName: string
}) {
  const projectUrl = `${siteConfig.url}/projects/${slug}`
  const lightEmbed = `${siteConfig.url}/embed/${slug}/light/license.png`
  const darkEmbed = `${siteConfig.url}/embed/${slug}/dark/license.png`

  const embeds = [
    {
      id: "light",
      label: "Light",
      previewSrc: `/embed/${slug}/light/opengraph-image`,
      code: buildEmbedHtml({
        projectUrl,
        projectName,
        embedSrc: lightEmbed,
      }),
    },
    {
      id: "dark",
      label: "Dark",
      previewSrc: `/embed/${slug}/dark/opengraph-image`,
      code: buildEmbedHtml({
        projectUrl,
        projectName,
        embedSrc: darkEmbed,
      }),
    },
  ]

  return (
    <section className="mt-10">
      <h2 className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Embeds
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Add interesting embeds to your website or README.
      </p>

      <h3 className="mb-3 text-sm font-medium">License</h3>

      <div className="flex flex-col gap-4">
        {embeds.map((embed) => (
          <div key={embed.id} className="overflow-hidden rounded-xl border">
            <div className="flex items-center justify-between gap-3 border-b bg-muted/40 px-4 py-3">
              <span className="text-sm font-medium">{embed.label}</span>
              <a
                href={projectUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block transition-opacity hover:opacity-80"
              >
                <Image
                  src={embed.previewSrc}
                  alt={`${projectName} on ${siteConfig.name}`}
                  width={160}
                  height={28}
                  unoptimized
                  className="h-7 w-40"
                />
              </a>
            </div>
            <div className="p-3">
              <CopyBlock code={embed.code} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export { ProjectEmbeds }
