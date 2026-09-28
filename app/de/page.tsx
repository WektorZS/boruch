import type { Metadata } from "next"
import { LocaleHeader } from "@/components/locale-header"
import { LocaleFooter } from "@/components/locale-footer"
import { LocaleHome } from "@/components/locale-home"
import { localeDictionaries } from "@/lib/translations"

const dict = localeDictionaries.de

export const metadata: Metadata = {
  title: dict.metaTitle,
  description: dict.metaDescription,
  alternates: {
    canonical: "/de",
    languages: { "pl-PL": "/", en: "/en", de: "/de", uk: "/uk", "x-default": "/" },
  },
}

export default function GermanHome() {
  return (
    <>
      <LocaleHeader locale="de" dict={dict} />
      <main>
        <LocaleHome locale="de" dict={dict} />
      </main>
      <LocaleFooter locale="de" dict={dict} />
    </>
  )
}
