export function LocaleServiceList({ items }: { items: { title: string; description: string }[] }) {
  return (
    <ul className="flex flex-col border-t border-border">
      {items.map((item) => (
        <li key={item.title} className="border-b border-border py-6 sm:px-3">
          <p className="font-heading text-lg font-semibold tracking-tight text-foreground">{item.title}</p>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        </li>
      ))}
    </ul>
  )
}
