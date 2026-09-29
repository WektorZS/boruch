import { GalleryPage } from "@/components/gallery-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("uk", "gallery")

export default function Page() {
  return <GalleryPage locale="uk" />
}
