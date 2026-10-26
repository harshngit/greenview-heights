import {
  Armchair, Baby, CarFront, Droplets, Dumbbell, HeartHandshake, Leaf, ScrollText, ShieldCheck, Trees, Users,
  FileText, BookOpen, Wallet, Siren, MessageSquareText,
} from 'lucide-react'

// Lets data files refer to icons by name.
const MAP = {
  Armchair, Baby, CarFront, Droplets, Dumbbell, HeartHandshake, Leaf, ScrollText, ShieldCheck, Trees, Users,
  FileText, BookOpen, Wallet, Siren, MessageSquareText,
}

export default function Icon({ name, ...props }) {
  const Cmp = MAP[name] ?? FileText
  return <Cmp aria-hidden="true" {...props} />
}
