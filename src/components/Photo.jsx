import { useState } from 'react'
import { ImageOff } from 'lucide-react'

// Image with a soft placeholder while loading and a calm fallback if the file is missing.
export default function Photo({ src, alt, className = '', imgClassName = '', loading = 'lazy', ...rest }) {
  const [state, setState] = useState('loading')
  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      {state !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
          className={`h-full w-full object-cover transition-opacity duration-700 ${state === 'loaded' ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
          {...rest}
        />
      )}
      {state === 'loading' && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-sand to-stone" aria-hidden="true" />}
      {state === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-forest-50 to-sand p-4 text-center text-ink-muted">
          <ImageOff className="h-6 w-6" aria-hidden="true" />
          <span className="text-xs">{alt}</span>
        </div>
      )}
    </div>
  )
}
