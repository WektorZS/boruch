import type { Metadata } from "next"
import { LocaleHeader } from "@/components/locale-header"
import { LocaleFooter } from "@/components/locale-footer"
import { LocaleHome } from "@/components/locale-home"
import { localeDictionaries } from "@/lib/translations"

const dict = localeDictionaries.en

export const metadata: Metadata = {
  title: dict.metaTitle,
  description: dict.metaDescription,
  alternates: {
    canonical: "/en",
    languages: { "pl-PL": "/", en: "/en", de: "/de", uk: "/uk" },
  },
}

export default function EnglishHome() {
  return (
    <>
      <LocaleHeader locale="en" dict={dict} />
      <main>
        <LocaleHome locale="en" dict={dict} />
      </main>
      <LocaleFooter locale="en" dict={dict} />
    </>
  )
}
