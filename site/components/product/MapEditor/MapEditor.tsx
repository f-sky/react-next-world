import { FC, useEffect } from 'react'
import { TiCompass, TiBrush } from 'react-icons/ti';
import { RiInputMethodLine, RiDragDropFill } from 'react-icons/ri';
import { HeartIcon, LocationMarkerIcon } from '@heroicons/react/solid'
import type { Product } from '@commerce/types/product'
import { ProductOptions } from '@components/product'
import usePrice from '@framework/product/use-price'

import dynamic from 'next/dynamic'
import { useState, useMemo, Fragment } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { Menu, RadioGroup, Transition, Listbox, Tab } from '@headlessui/react'
import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  DuplicateIcon,
  EyeIcon,
  GlobeIcon,
  PhotographIcon,
  ViewListIcon,
} from '@heroicons/react/outline'

import AutoComplete from 'react-google-autocomplete'

import { ChevronDownIcon } from '@heroicons/react/solid'

import s from '../ProductSidebar/ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { Button, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'

const features2 = [
  {
    name: 'Minimal and thoughtful',
    description:
      'Our laptop sleeve is compact and precisely fits 13" devices. The zipper allows you to access the interior with ease, and the front pouch provides a convenient place for your charger cable.',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-feature-07-detail-01.jpg',
    imageAlt: 'White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.',
  },
  {
    name: 'Refined details',
    description:
      'We design every detail with the best materials and finishes. This laptop sleeve features durable canvas with double-stitched construction, a felt interior, and a high quality zipper that hold up to daily use.',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-feature-07-detail-02.jpg',
    imageAlt: 'Detail of zipper pull with tan leather and silver rivet.',
  },
]

const features = [
  {
    name: 'Three card types',
    description:
      'Today, Next, and Someday cards allow you to defer your dreams into the future.',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-feature-08-detail-01.jpg',
    imageAlt: 'Green cardstock box containing white, beige, and brown cards.',
  },
  {
    name: 'The perfect mix',
    description:
      'Each refill pack contains plenty of cards to last you a month of procrastination.',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-feature-08-detail-02.jpg',
    imageAlt: 'Green cardstock box open with 50 cards inside.',
  },
  {
    name: 'Dot grid backs',
    description:
      'Flip a card over to doodle during meetings when you should be listening.',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-feature-08-detail-03.jpg',
    imageAlt:
      'Detail of white today card, beige next card, and brown someday card with dot grid.',
  },
  {
    name: 'Refill packs',
    description:
      'Subscribe and save on routine refill packs to keep you productive all year long.',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-feature-08-detail-04.jpg',
    imageAlt:
      'Stack of three green cardstock boxes with 3 hole cutouts showing cards inside.',
  },
]

const productData = {
  name: 'Custom City Framed Poster',
  price: '$48',
  rating: 3.9,
  reviewCount: 512,
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Women', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      id: 1,
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
      imageAlt: "Back of women's Basic Tee in black.",
      primary: true,
    },
    {
      id: 2,
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg',
      imageAlt: "Side profile of women's Basic Tee in black.",
      primary: false,
    },
    {
      id: 3,
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg',
      imageAlt: "Front of women's Basic Tee in black.",
      primary: false,
    },
  ],
  frames: [
    {
      jd: 0,
      name: 'default',
      preview: 'square.png',
    },
    {
      id: 1,
      name: 'circle',
      preview: 'circle.png',
    },
  ],
  layouts: {
    classic: {
      gradientBackgroundColor: '#fff',
    },
    modern: {},
    Square: {},
  },
  colors: [
    {
      name: 'Heather Grey',
      bgColor: 'bg-gray-400',
      selectedColor: 'ring-gray-400',
      mapStyle: 'cjria9ya35nzu2smgxatsz5fp',
      mapPreview: 'map-style-black.png',
      titleColor: 'text-black-400',
      subtitleColor: 'text-gray-400',
    },
    {
      name: 'Black',
      bgColor: 'bg-gray-900',
      selectedColor: 'ring-gray-400',
      mapStyle: 'cl2j6f9ae001014osfg024er5',
      mapPreview: 'map-style-blue.png',
      titleColor: 'text-blue-400',
      subtitleColor: 'text-blue-200',
    },
    {
      name: 'Heather Pink',
      bgColor: 'bg-gray-400',
      selectedColor: 'ring-gray-400',
      mapStyle: 'cl28ypih6000215kuhwwmdvmc',
      mapPreview: 'map-style-pink.png',
      titleColor: 'text-pink',
      subtitleColor: 'text-pink-light',

      // theme: {
      //   mapStyle: '',
      //   mapPreview: ''
      //   titleColor: '',
      //   subtitleColor: '',
      // }
    },

    {
      name: 'Minimal',

      // each layout will probably need its own color scheme/font change
      // ex: default, square, little square, circle, heart
      layout: {
        default: {
          bgColor: 'bg-gray-400',
          mapStyle: 'cl2nmx5yh003d14n1rokqj5lf',
          mapPreview: 'map-style-pink.png',
          titleColor: 'text-black-400',
          subtitleColor: 'text-gray-400',
          titleFont: 'text-montserrat',
          subtitleFont: 'text-oswald',
        },
        circle: {
          bgColor: 'bg-gray-400',
          mapStyle: 'cl2nmx5yh003d14n1rokqj5lf',
          mapPreview: 'map-style-pink.png',
          titleColor: 'text-black-400',
          subtitleColor: 'text-gray-400',
        },
      },

      bgColor: 'bg-gray-400',
      mapStyle: 'cl2nmx5yh003d14n1rokqj5lf',
      mapPreview: 'map-style-pink.png',
      titleColor: 'text-black-400',
      subtitleColor: 'text-gray-400',

      titleFont: 'text-rocksalt',
      subtitleFont: 'text-homemade',
    },
    {
      name: 'Gold',
      bgColor: 'bg-gray-400',
      mapStyle: 'cl2nndegp001g14qos6kwbncd',
      mapPreview: 'map-style-pink.png',
      titleColor: 'text-black-400',
      subtitleColor: 'text-gray-400',

      titleFont: 'text-rocksalt',
      subtitleFont: 'text-homemade',
    },
  ],
  sizes: [
    { name: 'Small - 5in x 7in', inStock: true },
    { name: 'Medium - 8in x 10in', inStock: true },
    { name: 'Large - 16in x 20in ', inStock: true },
    { name: 'X Large - 20in x 24in', inStock: true },
  ],
  orientations: [{ name: 'Portait' }, { name: 'Landscape' }],
  description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
  details: [
    'Only the best materials',
    'Ethically and locally made',
    'Pre-washed and pre-shrunk',
    'Machine wash cold with similar colors',
  ],
}

{
  productData.colors.map((color) => (
    <RadioGroup.Option
      key={color.name}
      value={color}
      className={({ active, checked }) =>
        classNames(
          color.selectedColor,
          active && checked ? 'ring ring-offset-1' : '',
          !active && checked ? 'ring-2' : '',
          '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
        )
      }
    >
      <RadioGroup.Label as="p" className="sr-only">
        {color.name}
      </RadioGroup.Label>
      <span
        aria-hidden="true"
        className={classNames(
          color.bgColor,
          'h-8 w-8 border border-black border-opacity-10 rounded-full'
        )}
      />
    </RadioGroup.Option>
  ))
}

const policies = [
  {
    name: 'International delivery',
    icon: GlobeIcon,
    description: 'Get your order in 2 years',
  },
  {
    name: 'Loyalty rewards',
    icon: CurrencyDollarIcon,
    description: "Don't look at other tees",
  },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface MapEditorProps {
  product: Product
  // relatedProducts: Product[]
}

const MapEditor: FC<MapEditorProps> = ({ product }) => {
  const [center, setCenter] = useState([40.70345695121932, -74.00004777219424])
  const [isMarkerEnabled, setMarkerEnabled] = useState(true)
  const [lat, setLat] = useState(40.70345695121932)
  const [lng, setLng] = useState(-74.00004777219424)
  const [title, setTitle] = useState('New York')
  const [subtitle, setSubtitle] = useState('United States')
  const [status, setStatus] = useState('')
  const [mapStyle, setMapStyle] = useState('cjria9ya35nzu2smgxatsz5fp')
  const [frame, setFrameStyle] = useState(0)
  const [layoutStyle, setLayoutStyle] = useState('')
  const [titleColor, setTitleColor] = useState('')
  const [subtitleColor, setSubtitleColor] = useState('')
  const [gradientBackgroundColor, setGradientBackgroundColor] = useState(
    productData.layouts.classic.gradientBackgroundColor
  )

  const addItem = useAddItem()
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const MapView = useMemo(
    () =>
      dynamic(
        () => import('./MapView'), // replace '@components/map' with your component's location
        {
          loading: () => <p>A map is loading</p>,
          ssr: false, // This line is important. It's what prevents server-side render
        }
      ),
    [lat, mapStyle, frame, layoutStyle] // state that should refresh the map
  )

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser')
    } else {
      setStatus('Locating...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus('')
          setLat(position.coords.latitude)
          setLng(position.coords.longitude)
        },
        () => {
          setStatus('Unable to retrieve your location')
        }
      )
    }
  }

  const [selectedColor, setSelectedColor] = useState(productData.colors[0])
  const [selectedSize, setSelectedSize] = useState(productData.sizes[0])
  const [selectOrientation, setSelectOrientation] = useState(
    productData.orientations[0]
  )

  const [placesError, setPlacesError] = useState('')

  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const onMove = (coords: any, zoom: any) => {
    setCenter([coords.lat, coords.lng])
  }

  return (
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-2">
        {/* <nav
          aria-label="Breadcrumb"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <ol role="list" className="flex items-center space-x-4">
            {productData.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-4 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    viewBox="0 0 6 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-auto text-gray-300"
                  >
                    <path
                      d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={productData.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {productData.name}
              </a>
            </li>
          </ol>
        </nav> */}
        <div
          id="art-frame"
          className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <div className="lg:col-start-8 lg:col-span-5">
              <div className="flex justify-between">
                <h1 className="text-3xl font font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {product.name}
                </h1>
                <p className="text-xl font font-extrabold tracking-tight text-gray-900 sm:text-xl">{price}</p>
              </div>
              {/* Reviews */}
              <div className="mt-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {productData.rating}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          productData.rating > rating
                            ? 'text-yellow-400'
                            : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div
                    aria-hidden="true"
                    className="ml-4 text-sm text-gray-300"
                  >
                    ·
                  </div>
                  <div className="ml-4 flex">
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-600 hover:text-gray-500"
                    >
                      See all {productData.reviewCount} reviews
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-4 md:mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
              <h2 className="sr-only">Images</h2>

              <div>
                <div className="editor py-4 md:pt-0 md:pb-10">
                  <div className="editor-wrapper aspect-[18/24] overflow-hidden relative">
                    {/* change frame with border colors here */}
                    {isMarkerEnabled && (
                      <div className="marker-overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-red"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}

                    <MapView
                      title={title}
                      subtitle={subtitle}
                      width="354.5px"
                      height="1000px"
                      lng={lng}
                      lat={lat}
                      mapStyle={mapStyle}
                      layout={frame}
                      layoutStyle={layoutStyle}
                      titleColor={titleColor}
                      subtitleColor={subtitleColor}
                      gradientBackgroundColor={gradientBackgroundColor}
                      onMove={onMove}
                      // onMove={onMove}
                      // eventually just pass in theme={theme} has all of the layouts
                    />
                  </div>
                </div>
                {/* <div className="relative"> */}
                {/* <img
                    className="absolute"
                    style={{
                      width: '500px',
                      left: '-80px',
                      top: '-30px',
                      maxWidth: 'none',
                    }}
                    src="https://www.ikea.com/us/en/images/products/ribba-frame-black__0638340_pe698864_s5.jpg"
                  /> */}
                {/* <MapView
                    title="New york"
                    subtitle="Test"
                    width="354.5px"
                    height="443px"
                    mapStyle="cl0howgz1000414mxx2vhk2jw"
                  /> */}
                {/* </div> */}
                {/* {productData.images.map((image) => (
                  <img
                    key={image.id}
                    src={image.imageSrc}
                    alt={image.imageAlt}
                    className={classNames(
                      image.primary ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
                      'rounded-lg'
                    )}
                  />
                ))} */}
              </div>
            </div>

            <div className="product-sidebar lg:col-span-5">
              <Tab.Group as="div">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px mt-4 flex space-x-4">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-gray-600 text-gray-800'
                            : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                          'whitespace-nowrap py-2 border-b-2 font-medium text-sm'
                        )
                      }
                    >
                      {/* <StarIcon className="h-6 w-6 text-gray-500 inline mr-2" /> */}
                      <TiCompass className="h-6 w-6 inline text-gray-800 mr-2" />
                      Location
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-gray-600 text-gray-800'
                            : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                          'whitespace-nowrap py-2 border-b-2 font-medium text-sm'
                        )
                      }
                    >
                      <TiBrush className="h-6 w-6 text-gray-500 inline mr-2" />
                      Design
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-gray-600 text-gray-800'
                            : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                          'whitespace-nowrap py-2 border-b-2 font-medium text-sm'
                        )
                      }
                    >
                      <RiInputMethodLine className="h-6 w-6 inline text-gray-800 mr-2" />
                      Text
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-gray-800 text-gray-800'
                            : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                          'whitespace-nowrap py-2 border-b-2 font-medium text-sm'
                        )
                      }
                    >
                      <RiDragDropFill className="h-6 w-6 text-gray-500 inline mr-2" />
                      Format
                    </Tab>
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  <Tab.Panel>
                    <h3 className="sr-only">Customer Reviews</h3>

                    <div className="mt-4 prose prose-sm max-w-none text-gray-500">
                      <div className="product-sidebar__heading">
                        <h2 className="text-lg font-bold text-gray-900">
                          Location
                        </h2>
                        <p className="text-gray-400">
                          Find your favorite place and move around the map until
                          you find the exact area you want to print.
                        </p>
                      </div>
                      <div className="my-7 flex flex-col">
                        <h2 className="text-sm font-medium text-gray-900">
                          Location
                        </h2>
                        <AutoComplete
                          // className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                          // style={{ background: 'red' }}
                          className="w-full p-2 border-2 border-gray-300 rounded-none rounded-r-md"
                          apiKey={'AIzaSyDUc5Y4hdG1FvoJVP7aNhSni4rIoLd_ca0'}
                          onPlaceSelected={(place: any) => {
                            try {
                              const lat = place.geometry.location.lat()
                              const lng = place.geometry.location.lng()
                              const title =
                                place.address_components[0].long_name
                              const subtitle =
                                place.address_components[
                                  place.address_components.length - 1
                                ].long_name

                              setTitle(title)
                              setSubtitle(subtitle)
                              setLng(lng)
                              setLat(lat)
                              setPlacesError('')
                            } catch (error) {
                              setPlacesError('Error: please select a location')
                            }
                          }}
                        />
                        <span className="text-red">{placesError}</span>
                        <a
                          href="#"
                          className="mt-4 text-gray-500"
                          onClick={getUserLocation}
                        >
                          <LocationMarkerIcon className="h-6 w-6 text-red inline mr-2" />
                          Use Current Location
                        </a>
                        {/* Might not need this anymore? - <GetLocationButton getUserLocation={getUserLocation} /> */}
                      </div>

                      <div className="product-sidebar__heading">
                        <h2 className="text-lg font-bold text-gray-900">
                          Place A Marker?
                        </h2>
                        <div className="mt-2 relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="comments"
                              aria-describedby="comments-description"
                              name="comments"
                              type="checkbox"
                              checked={isMarkerEnabled}
                              onChange={(ev) =>
                                setMarkerEnabled(!isMarkerEnabled)
                              }
                              className="focus:ring-gray-500 h-4 w-4 text-black border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="comments"
                              className="font-medium text-gray-700"
                            >
                              Add map marker
                            </label>
                            <span
                              id="comments-description"
                              className="text-gray-500"
                            >
                              <span className="sr-only">New comments </span> -
                              mark a special place or event.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="my-4">
                        <button
                          type="button"
                          className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ring-2 ring-gray-200"
                        >
                          <HeartIcon
                            className="h-6 w-6 text-red"
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          type="button"
                          className="mx-4 inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ring-2 ring-gray-200"
                        >
                          <HeartIcon
                            className="h-6 w-6 text-red"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </Tab.Panel>

                  <Tab.Panel as="dl" className="text-sm text-gray-500">
                    <h3 className="sr-only">Map Style</h3>

                    <div className="mt-4 prose prose-sm max-w-none text-gray-500">
                      <div className="product-sidebar__heading">
                        <h2 className="text-lg font-bold text-gray-900">
                          Map Style
                        </h2>
                        <p className="text-gray-400">
                          Change the color of the map and add finishing touches
                        </p>
                      </div>
                      {/* Color picker */}
                      {/* <div className="my-7">
                        <h2 className="text-sm font-medium text-gray-900">
                          Frame Style
                        </h2>

                        <RadioGroup
                          value={selectedColor}
                          onChange={(selected) => {
                            console.log(selected, 'frame selected')
                            // setFrameStyle(selected.layout)
                          }}
                          className="mt-2"
                        >
                          <RadioGroup.Label className="sr-only">
                            Choose a color
                          </RadioGroup.Label>
                          <div className="flex items-center space-x-3">
                            {productData.frames.map((frame) => (
                              <RadioGroup.Option
                                key={frame.id}
                                value={frame.id}
                                className={({ active, checked }) =>
                                  classNames(
                                    // color.selectedColor,
                                    active && checked
                                      ? 'ring ring-offset-1'
                                      : '',
                                    !active && checked ? 'ring-2' : '',
                                    '-m-0.5 relative p-0.5 flex items-center justify-center cursor-pointer focus:outline-none'
                                  )
                                }
                              >
                                <RadioGroup.Label as="p" className="sr-only">
                                  {frame.name}
                                </RadioGroup.Label>
                                <span
                                  aria-hidden="true"
                                  style={{
                                    background: `url("/assets/${frame.preview}")`,
                                    backgroundSize: 'cover',
                                  }}
                                  className={classNames('h-10 w-10')}
                                />
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div> */}
                      <h3 className="sr-only">Layout</h3>

                      <div className="mt-4 prose prose-sm max-w-none text-gray-500">
                        <div className="my-7">
                          <button
                            type="button"
                            className={`mr-2.5 px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500
        ${
          layoutStyle == 'classic' &&
          'outline-none ring-1 ring-indigo-500 border-indigo-500'
        }`}
                            onClick={() => setLayoutStyle('classic')}
                          >
                            Classic
                          </button>
                          <button
                            type="button"
                            className={`mr-2.5 px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500
        ${
          layoutStyle == 'modern' &&
          'outline-none ring-1 ring-indigo-500 border-indigo-500'
        }`}
                            onClick={() => setLayoutStyle('modern')}
                          >
                            Modern
                          </button>
                          <button
                            type="button"
                            className={`px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500
        ${
          layoutStyle == 'square' &&
          'outline-none ring-1 ring-indigo-500 border-indigo-500'
        }`}
                            onClick={() => setLayoutStyle('square')}
                          >
                            Square
                          </button>
                        </div>
                      </div>

                      {/* Color picker */}
                      <div className="my-7">
                        <h2 className="text-sm font-medium text-gray-900">
                          Map Style
                        </h2>

                        <RadioGroup
                          value={selectedColor}
                          onChange={(selected) => {
                            setMapStyle(selected.mapStyle)
                            setLat(center[0])
                            setLng(center[1])
                            setSelectedColor(selected)
                            setTitleColor(selected.titleColor)
                            setSubtitleColor(selected.subtitleColor)
                          }}
                          className="mt-2"
                        >
                          <RadioGroup.Label className="sr-only">
                            Choose a color
                          </RadioGroup.Label>
                          <div className="flex items-center space-x-3">
                            {productData.colors.map((color) => (
                              <RadioGroup.Option
                                key={color.name}
                                value={color}
                                className={({ active, checked }) =>
                                  classNames(
                                    color.selectedColor,
                                    active && checked
                                      ? 'ring ring-offset-1'
                                      : '',
                                    !active && checked ? 'ring-2' : '',
                                    '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                  )
                                }
                              >
                                <RadioGroup.Label as="p" className="sr-only">
                                  {color.name}
                                </RadioGroup.Label>
                                <span
                                  aria-hidden="true"
                                  style={{
                                    background: `url("/assets/${color.mapPreview}")`,
                                  }}
                                  className={classNames(
                                    'h-10 w-10 border border-black border-opacity-10 rounded-full'
                                  )}
                                />
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    {/* {faqs.map((faq) => (
                    <Fragment key={faq.question}>
                      <dt className="mt-10 font-medium text-gray-900">{faq.question}</dt>
                      <dd className="mt-2 prose prose-sm max-w-none text-gray-500">
                        <p>{faq.answer}</p>
                      </dd>
                    </Fragment>
                  ))} */}
                  </Tab.Panel>

                  <Tab.Panel>
                    <h3 className="sr-only">License</h3>
                    <div className="mt-4 prose prose-sm max-w-none text-gray-500">
                      <div className="product-sidebar__heading">
                        <h2 className="text-lg font-bold text-gray-900">
                          Custom Text
                        </h2>
                        <p className="text-gray-400">
                          Customize the print with your own text
                        </p>
                      </div>
                      <div className="my-7">
                        <h2 className="text-sm font-medium text-gray-900">
                          Big Text
                        </h2>
                        <input
                          type="text"
                          name="title"
                          className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                          onChange={(ev) => setTitle(ev.target.value)}
                          defaultValue={title}
                        />
                      </div>
                      <div className="my-7">
                        <h2 className="text-sm font-medium text-gray-900">
                          Small Text
                        </h2>
                        <input
                          type="text"
                          name="subtitle"
                          id="subtitle"
                          className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                          onChange={(ev) => setSubtitle(ev.target.value)}
                          defaultValue={subtitle}
                        />
                      </div>
                    </div>
                    {/* <div
                    className="prose prose-sm max-w-none text-gray-500"
                    dangerouslySetInnerHTML={{ __html: license.content }}
                  /> */}
                  </Tab.Panel>
                  <Tab.Panel>
                    <h3 className="sr-only">Format</h3>
                    <div className="mt-4 prose prose-sm max-w-none text-gray-500">
                      <ProductOptions
                        options={product.options}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                      />
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>

              <form>
                <div className="z-10 mt-8">
                  {/* Size picker */}
                  {/* <div className="mt-8">
                    <div className="w-72">
                      <Listbox value={selectedSize} onChange={setSelectedSize}>
                        <Listbox.Label className="text-sm font-medium text-gray-900">
                          Size
                        </Listbox.Label>
                        <Listbox.Button className="mt-2 w-72 flex flex-row items-center justify-between border-0 border-b-2 border-slate-300 focus:outline-none focus:ring-indigo-500">
                          <span className="block pl-2 pb-2">
                            {selectedSize.name}
                          </span>
                          <ChevronDownIcon className="right-0 w-5 h-5" />
                        </Listbox.Button>

                        <Listbox.Options className="absolute mt-1 shadow-2xl  z-10 w-72 bg-white rounded-b-md hover:cursor-pointer">
                          {productData.sizes.map((size, sizeIdx) => (
                            <Listbox.Option
                              className="pl-2 "
                              key={sizeIdx}
                              value={size}
                            >
                              <span>{size.name}</span>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Listbox>
                    </div>

                    <div className="my-4 w-72">
                      <Listbox
                        value={selectOrientation}
                        onChange={setSelectOrientation}
                      >
                        <Listbox.Label className="text-sm font-medium text-gray-900">
                          Orientation
                        </Listbox.Label>
                        <Listbox.Button className="mt-2 w-72 flex flex-row items-center justify-between border-0 border-b-2 border-slate-300 focus:outline-none focus:ring-indigo-500">
                          <span className="block pl-2 pb-2">
                            {selectOrientation.name}
                          </span>
                          <ChevronDownIcon className="right-0 w-5 h-5" />
                        </Listbox.Button>

                        <Listbox.Options className="absolute mt-1 shadow-2xl  z-10 w-72 bg-white rounded-b-md hover:cursor-pointer">
                          {productData.orientations.map(
                            (orientation, orientationIdx) => (
                              <Listbox.Option
                                className="pl-2"
                                key={orientationIdx}
                                value={orientation}
                              >
                                <span>{orientation.name}</span>
                              </Listbox.Option>
                            )
                          )}
                        </Listbox.Options>
                      </Listbox>
                    </div>
                  </div> */}
                  {/* <ProductOptions
                    options={product.options}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                  /> */}

                  <Button
                    aria-label="Add to Cart"
                    type="button"
                    className={s.button}
                    onClick={addToCart}
                    loading={loading}
                    disabled={variant?.availableForSale === false}
                  >
                    {variant?.availableForSale === false
                      ? 'Not Available'
                      : 'Add To Cart'}
                  </Button>
                  {/* <button
                  type="submit"
                  className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-0"
                >
                  Add to cart
                </button> */}
                </div>
              </form>

              {/* productData details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>

                <div
                  className="mt-4 prose prose-sm text-gray-500"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="max-w-2xl mx-auto py-14 px-4 sm:py-32 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="max-w-3xl">
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How It Works
            </p>
            <p className="mt-4 text-gray-500">
              Focus allows you to plan 10 daily tasks, while also thinking ahead
              about what's next. Forget distracting digital apps and embrace
              these small, sturdy pieces of paper.
            </p>
          </div>

          <div className="mt-11 grid items-start grid-cols-1 gap-y-16 gap-x-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col-reverse">
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src={feature.imageSrc}
                    alt={feature.imageAlt}
                    className="object-center object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Guarantee
            </h2>
            <p className="mt-4 text-gray-500">
              As a digital creative, your laptop or tablet is at the center of
              your work. Keep your device safe with a fabric sleeve that matches
              in quality and looks.
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {features2.map((feature, featureIdx) => (
              <div
                key={feature.name}
                className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center"
              >
                <div
                  className={classNames(
                    featureIdx % 2 === 0
                      ? 'lg:col-start-1'
                      : 'lg:col-start-8 xl:col-start-9',
                    'mt-6 lg:mt-0 lg:row-start-1 lg:col-span-5 xl:col-span-4'
                  )}
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
                <div
                  className={classNames(
                    featureIdx % 2 === 0
                      ? 'lg:col-start-6 xl:col-start-5'
                      : 'lg:col-start-1',
                    'flex-auto lg:row-start-1 lg:col-span-7 xl:col-span-8'
                  )}
                >
                  <div className="aspect-w-5 aspect-h-2 rounded-lg bg-gray-100 overflow-hidden">
                    <img
                      src={feature.imageSrc}
                      alt={feature.imageAlt}
                      className="object-center object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapEditor
