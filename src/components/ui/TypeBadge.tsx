import { typeColor } from '../../lib/typeColors'

interface Props {
  type: string
  small?: boolean
}

export function TypeBadge({ type, small }: Props) {
  return (
    <span
      className={`${typeColor(type)} ${small ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs'} rounded font-bold uppercase tracking-wide`}
    >
      {type}
    </span>
  )
}
