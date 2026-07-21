import { copyFile, readdir, stat } from "node:fs/promises"
import { dirname, join } from "node:path"

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
        await copyFile(full, join(dirname(full), "license.png"))
      }
    })
  )
}

await walk(join(process.cwd(), "out/embed"))
console.log("Copied embed images to license.png")
