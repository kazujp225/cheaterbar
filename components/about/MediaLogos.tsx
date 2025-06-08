"use client"

import { FC } from "react"

interface MediaLogo {
  name: string
  displayName: string
}

interface MediaLogosProps {
  logos: MediaLogo[]
}

const MediaLogos: FC<MediaLogosProps> = ({ logos }) => {
  return (
    <div className="media-logos flex flex-wrap gap-4">
      {logos.map((logo) => (
        <div key={logo.name} className="media-logo p-4 border rounded">
          <span>{logo.displayName}</span>
        </div>
      ))}
    </div>
  )
}

export default MediaLogos