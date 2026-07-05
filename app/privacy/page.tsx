import type { Metadata } from "next"

import { siteConfig } from "lib/site"

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "This website does not collect, store, process, or share any personal data of its visitors.",
  keywords: ["privacy", "privacy notice", "data protection", "no tracking"],
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Notice | ${siteConfig.name}`,
    description:
      "This website does not collect, store, process, or share any personal data of its visitors.",
    url: "/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold">Privacy Notice</h1>
      <div className="text-muted-foreground mt-6 flex flex-col gap-4 leading-relaxed">
        <p>
          This website does not collect, store, process, or share any personal
          data of its visitors.
        </p>
        <p>
          No user registration is required. No personal information, cookies,
          analytics, or tracking technologies are used.
        </p>
        <p>
          All content published on this website, including project names,
          descriptions, images, and other materials, is intended to be publicly
          available.
        </p>
        <p>
          By using this website, you acknowledge that all content is public and
          that no personal data is collected or processed by the website.
        </p>
      </div>
    </main>
  )
}
