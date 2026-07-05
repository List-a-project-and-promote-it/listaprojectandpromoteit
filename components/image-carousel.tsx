"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "lib/utils"

function ImageCarousel({
  images,
  alt,
}: {
  images: string[]
  alt: string
}) {
  const [index, setIndex] = React.useState(0)

  if (images.length === 0) {
    return null
  }

  const count = images.length
  const goTo = (next: number) => setIndex((next + count) % count)

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-xl border">
        <Image
          key={images[index]}
          src={images[index]}
          alt={`${alt} — ${index + 1}`}
          fill
          unoptimized
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => goTo(index - 1)}
              className="bg-background/70 hover:bg-background absolute top-1/2 left-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur transition-colors"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => goTo(index + 1)}
              className="bg-background/70 hover:bg-background absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur transition-colors"
            >
              <ChevronRight className="size-4" />
            </button>

            <div className="bg-background/70 text-foreground absolute right-2 bottom-2 rounded-md border px-2 py-0.5 text-xs backdrop-blur">
              {index + 1} / {count}
            </div>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="flex flex-wrap gap-2">
          {images.map((image, i) => (
            <button
              key={image}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "bg-muted relative aspect-video w-20 shrink-0 overflow-hidden rounded-md border transition-opacity",
                i === index
                  ? "ring-ring ring-2 ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={image}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                unoptimized
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { ImageCarousel }
