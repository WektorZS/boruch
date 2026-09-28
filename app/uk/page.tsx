import type { Metadata } from "next"
import { LocaleHeader } from "@/components/locale-header"
import { LocaleFooter } from "@/components/locale-footer"
import { LocaleHome } from "@/components/locale-home"
import { localeDictionaries } from "@/lib/translations"

const dict = localeDictionaries.uk

export const metadata: Metadata = {
  title: dict.metaTitle,
  description: dict.metaDescription,
  alternates: {
    canonical: "/uk",
    languages: { "pl-PL": "/", en: "/en", de: "/de", uk: "/uk", "x-default": "/" },
  },
}

export default function UkrainianHome() {
  return (
    <>
      <LocaleHeader locale="uk" dict={dict} />
      <main>
        <LocaleHome locale="uk" dict={dict} />
      </main>
      <LocaleFooter locale="uk" dict={dict} />
    </>
  )
}
