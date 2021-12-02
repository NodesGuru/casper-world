import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import type { MapData } from '@utils/types'

export default function DecentralizationMap({ data }: { data: MapData[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref?.current && data?.length > 0) {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        version: 'weekly'
      })

      loader
        .load()
        .then(() => {
          const map = new google.maps.Map(ref.current!, {
            center: { lat: 46.227638, lng: 2.213749 },
            zoom: 2.6,
            disableDefaultUI: true,
            zoomControl: true
          })
          data.forEach(c => new google.maps.Marker({ position: { lat: c.latitude, lng: c.longitude }, map }))
        })
    }
  }, [])

  return (
    <>
      <div ref={ref} />

      <style jsx>{`
        div {
          height: 100%;
        }
      `}</style>
    </>
  )
}
