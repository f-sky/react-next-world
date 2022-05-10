// @ts-nocheck
import { FC, useEffect, useCallback, useState } from 'react'
import {
  LayersControl,
  SVGOverlay,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  Circle,
  useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import MapCenter from './MapCenter';
import Classic from '../MapLayout/Classic';
import Modern from '../MapLayout/Modern';

interface LayoutProps {
  title: string
  titleColor: string
  subtitle: string
  subtitleColor: string
  height: string
  mapStyle: string // cl0howgz1000414mxx2vhk2jw
  lat: number
  lng: number
  layout: number
  layoutStyle: string
  gradientBackgroundColor: string
  onMove?(coords: [number, number], zoom: number): any
}

export const DefaultFrame: FC<LayoutProps> = ({
  lat,
  lng,
  height,
  mapStyle,
  layoutStyle,
  title,
  titleColor,
  subtitle,
  subtitleColor,
  gradientBackgroundColor,
  onMove
}) => {
  // const [map, setMap] = useState(null);

  // const onMove = useCallback(() => {
  //   console.log(map.getCenter());
  // }, [map]);

  //   map.on('move', onMove);

  //   console.log(map, 'map')

  return (
    <div className="mask-w h-full">
      <MapContainer
        zoom={13}
        zoomControl={false}
        center={[lat, lng]}
        scrollWheelZoom={false}
        // ref={setMap}
        style={{
          height,
          // width,
          position: 'relative',
          // border: "15px solid #111",
          zIndex: 1,
          // boxShadow: "18px 18px 45px rgb(0 0 0 / 30%)",
        }}
        attributionControl={false}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/jbedo/${mapStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamJlZG8iLCJhIjoiY2lrYm50dWR4MG03cHZqa3BycXE1dmw4dyJ9.v6Mp7vCiYGVe49UFjooYtQ`}
        />
        <ZoomControl position="topleft" />        

        {/* <SVGOverlay
      attributes={{ stroke: "red" }}
      bounds={bounds}
    >

      <text x="50%" y="50%" stroke="red">
        North Carolina
      </text>
    </SVGOverlay> */}
        {/* <TileLayer
    attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
    url={`https://api.mapbox.com/styles/v1/jbedo/cjria9ya35nzu2smgxatsz5fp.html?title=view&access_token=pk.eyJ1IjoiamJlZG8iLCJhIjoiY2lrYm50dWR4MG03cHZqa3BycXE1dmw4dyJ9.v6Mp7vCiYGVe49UFjooYtQ&zoomwheel=true&fresh=true#10/42.3624/-71.02`}
  /> */}
        <MapCenter onMove={onMove} />
      </MapContainer>
      { layoutStyle == "classic" && 
        <Classic
          title={title}
          subtitle={subtitle}
          titleColor={titleColor}
          subtitleColor={subtitleColor}
          gradientBackgroundColor={gradientBackgroundColor}
        />
      }
      { layoutStyle == "modern" && 
        <Modern
          title={title}
          subtitle={subtitle}
          titleColor={titleColor}
          subtitleColor={subtitleColor}
        />
      }
    </div>
  )
}

export const CircleFrame: FC<LayoutProps> = ({
  lat,
  lng,
  height,
  mapStyle,
  title,
  titleColor,
  subtitle,
  subtitleColor,
}) => {
  return (
    <div className="circle-frame relative">
      <MapContainer
        zoom={13}
        center={[lat, lng]}
        scrollWheelZoom={false}
        style={{
          height,
          // width,
          position: 'relative',
          // border: "15px solid #111",
          zIndex: 1,
          // boxShadow: "18px 18px 45px rgb(0 0 0 / 30%)",
        }}
        attributionControl={false}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/jbedo/${mapStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamJlZG8iLCJhIjoiY2lrYm50dWR4MG03cHZqa3BycXE1dmw4dyJ9.v6Mp7vCiYGVe49UFjooYtQ`}
        />

        <div
          style={{ zIndex: 999 }}
          className="relative z-50 h-full w-full text-center"
        >
          <div
            style={{
              zIndex: 200,
              background:
                'linear-gradient(to bottom,rgba(255,255,255,0) 0,#fff 95%,#fff 50%)',
            }}fp
            className="p-5 absolute inset-x-0 bottom-0 h-17"
          >
            <h1
              className={`${titleColor} text-4xl font-bold text-rocksalt`}
            >
              {title}
            </h1>
            <span
              className={`${subtitleColor} text-xl text-homemade`}
            >
              {subtitle}
            </span>
          </div>
          <div style={{zIndex: 100 }} className="circle-frame-overlay"></div>
        </div>

        {/* <SVGOverlay
      attributes={{ stroke: "red" }}
      bounds={bounds}
    >

      <text x="50%" y="50%" stroke="red">
        North Carolina
      </text>
    </SVGOverlay> */}
        {/* <TileLayer
    attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
    url={`https://api.mapbox.com/styles/v1/jbedo/cjria9ya35nzu2smgxatsz5fp.html?title=view&access_token=pk.eyJ1IjoiamJlZG8iLCJhIjoiY2lrYm50dWR4MG03cHZqa3BycXE1dmw4dyJ9.v6Mp7vCiYGVe49UFjooYtQ&zoomwheel=true&fresh=true#10/42.3624/-71.02`}
  /> */}
      </MapContainer>
    </div>
  )
}

// clip-path: circle(40% at 50% 50%);
