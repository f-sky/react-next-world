import { FC, useEffect } from 'react'
import { DefaultFrame, CircleFrame } from './FrameLayout';

interface MapViewProps {
  title: string
  subtitle: string
  width: string
  height: string
  mapStyle: string // cl0howgz1000414mxx2vhk2jw
  lat: number
  lng: number
  layout: number
  layoutStyle: string
  titleColor: string
  subtitleColor: string
  gradientBackgroundColor: string
  onMove?(coords: any, zoom: any): any
}

const MapView: FC<MapViewProps> = (args) => {
  useEffect(() => {
    // window.scrollTo(0, 0)
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent
      )
    ) {
      document.getElementById('art-frame')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const { layout } = args;

  switch (layout) {
    case 0:
      return <DefaultFrame {...args} />
      break;
    case 1:
      return <CircleFrame {...args} />
      break;
    default:
      return <DefaultFrame {...args} />
  }
}


export default MapView
