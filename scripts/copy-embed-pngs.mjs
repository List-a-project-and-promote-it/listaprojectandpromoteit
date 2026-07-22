import { copyFile, readdir, stat } from "node:fs/promises"
import { basename, dirname, join } from "node:path"

async function walk(dir) {
  const entries = await readdir(dir)
  await Promise.all(
    entries.map(async (name) => {
      const full = join(dir, name)
      const info = await stat(full)
      if (info.isDirectory()) {
        await walk(full)
        return
      }
      if (name === "opengraph-image") {
        // /embed/{slug}/{kind}/{theme}/opengraph-image → {kind}.png
        const kind = basename(dirname(dirname(full)))
        await copyFile(full, join(dirname(full), `${kind}.png`))
      }
    })
  )
}

await walk(join(process.cwd(), "out/embed"))
console.log("Copied embed images to license.png / added.png")
