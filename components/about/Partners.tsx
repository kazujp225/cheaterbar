"use client"

import { FC } from "react"

interface Partner {
  name: string
  type: string
}

interface PartnersProps {
  partners: Partner[]
}

const Partners: FC<PartnersProps> = ({ partners }) => {
  return (
    <div className="partners grid grid-cols-2 md:grid-cols-4 gap-4">
      {partners.map((partner) => (
        <div key={partner.name} className="partner-card p-4 border rounded text-center">
          <h3 className="font-semibold">{partner.name}</h3>
          <p className="text-sm text-gray-600">{partner.type}</p>
        </div>
      ))}
    </div>
  )
}

export default Partners