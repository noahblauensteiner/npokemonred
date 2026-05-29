import { spriteUrl } from '../../lib/dexSprite'

interface Props {
  dexId: number
  name: string
  size?: number
  className?: string
}

export function SpriteImg({ dexId, name, size = 64, className = '' }: Props) {
  return (
    <img
      src={spriteUrl(dexId)}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      className={`pixelated ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  )
}
