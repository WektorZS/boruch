import {
  Armchair,
  Contrast,
  Disc3,
  Droplets,
  Gem,
  Hand,
  Hexagon,
  Palette,
  Shield,
  Sparkles,
  Wand2,
  WashingMachine,
  type LucideIcon,
} from "lucide-react"
import type { Service } from "@/lib/services-data"

const iconMap: Record<Service["icon"], LucideIcon> = {
  droplets: Droplets,
  sparkles: Sparkles,
  "washing-machine": WashingMachine,
  armchair: Armchair,
  gem: Gem,
  shield: Shield,
  hexagon: Hexagon,
  hand: Hand,
  contrast: Contrast,
  wand: Wand2,
  disc: Disc3,
  palette: Palette,
}

export function ServiceIcon({ icon, className }: { icon: Service["icon"]; className?: string }) {
  const Icon = iconMap[icon]
  return <Icon className={className} aria-hidden="true" />
}
