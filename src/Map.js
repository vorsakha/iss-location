import React, { useState, useEffect } from "react"

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'


export default function GreatMap() {
    const[latitude, setLat] = useState(0)
    const[longitude, setLon] = useState(0)

    const position = [latitude, longitude]
    const attribution = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    

    const map = (
        <Map  className="mx-auto border border-dark" center={position} zoom={4} >
           <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             attribution={attribution}
          />
            <Marker position={position}>
                <Popup>
                    <span>ISS <br/> Exact Location</span>
                </Popup>
            </Marker>
        </Map>
      )

    useEffect(() => {
        setTimeout(() => {
            getISS()
        }, 2000)
    })

    async function getISS() {
        const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544")
        const data = await response.json()
        setLat(data.latitude)
        setLon(data.longitude)
    }

    return(
        <div className="text-center">
            <h1 className="">Where is the ISS?</h1>
            <p>Latitude: <span>{latitude.toFixed(2)}</span></p>
            <p>Longitude: <span>{longitude.toFixed(2)}</span></p>
            <div className="mx-auto">
            {map}
            </div>
        </div>
    )
}