import { notFound, redirect } from "next/navigation"

import { type Project } from "components/projects-grid"
import projectsData from "data/projects.json"

const projects = projectsData as Project[]

export const dynamic = "force-static"

export function generateStaticParams() {
  return projects.flatMap((project) => [
    { slug: project.slug, theme: "light" },
    { slug: project.slug, theme: "dark" },
  ])
}

export default async function EmbedPage({
  params,
}: {
  params: Promise<{ slug: string; theme: string }>
}) {
  const { slug, theme } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project || (theme !== "light" && theme !== "dark")) {
    notFound()
  }

  redirect(`/projects/${project.slug}`)
}
