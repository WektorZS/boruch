import { ServicePage, serviceMetadata } from "@/components/service-page"

export const metadata = serviceMetadata("mycie-zewnatrz")

export default function Page() {
  return <ServicePage slug="mycie-zewnatrz" />
}
