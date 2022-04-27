import { FC, useEffect } from 'react'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'

import dynamic from 'next/dynamic'
import { useState, useMemo, Fragment } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { Menu, RadioGroup, Transition, Listbox } from '@headlessui/react'
import { CurrencyDollarIcon, GlobeIcon } from '@heroicons/react/outline'

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
  colors: [
    {
      name: 'Black',
      bgColor: 'bg-gray-900',
      selectedColor: 'ring-gray-400',
      mapStyle: 'cl0howgz1000414mxx2vhk2jw',
      mapPreview: 'map-style-blue.png',
    },
    {
      name: 'Heather Grey',
      bgColor: 'bg-gray-400',
      selectedColor: 'ring-gray-400',
      mapStyle: 'cjria9ya35nzu2smgxatsz5fp',
      mapPreview: 'map-style-black.png',
    },
    {
      name: 'Heather Pink',
      bgColor: 'bg-gray-400',
      selectedColor: 'ring-gray-400',
      mapStyle: 'cl28ypih6000215kuhwwmdvmc',
      mapPreview: 'map-style-pink.png',
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
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [title, setTitle] = useState('New York')
  const [subtitle, setSubtitle] = useState('United States')
  const [status, setStatus] = useState('')
  const [mapStyle, setMapStyle] = useState('cjria9ya35nzu2smgxatsz5fp')



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
      console.log(err);
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
    [lat, mapStyle] // state that should refresh the map
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

  return (
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24">
        <nav
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
        </nav>
        <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <div className="lg:col-start-8 lg:col-span-5">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  {productData.name}
                </h1>
                <p className="text-xl font-medium text-gray-900">
                  {productData.price}
                </p>
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
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      See all {productData.reviewCount} reviews
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
              <h2 className="sr-only">Images</h2>

              <div>
                <div className="art-collection m-5">
                  <div className="art-frame vertical overflow-hidden">{/* change frame with border colors here */}
                    <MapView
                      title={title}
                      subtitle={subtitle}
                      width="354.5px"
                      height="550px"
                      lng={lng}
                      lat={lat}
                      mapStyle={mapStyle}
                      layout={2}
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

            <div className="product-sidebar mt-8 lg:col-span-5">
              <form>
                <div className="product-sidebar__heading">
                  <h2 className="text-lg font-bold text-gray-900">Location</h2>
                  <p className="text-gray-400">
                    Find your favorite place and move around the map until you
                    find the exact area you want to print.
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
                      try{
                      const lat = place.geometry.location.lat()
                      const lng = place.geometry.location.lng()
                      const title = place.address_components[0].long_name
                      const subtitle =
                        place.address_components[
                          place.address_components.length - 1
                        ].long_name

                      setTitle(title)
                      setSubtitle(subtitle)
                      setLng(lng)
                      setLat(lat)
                      setPlacesError('')
                      }catch (error) {
                        setPlacesError('Error: please select a location')
                      }
                    }}
                  />
                  <span className="text-red">{placesError}</span>
                  <a href="#" onClick={getUserLocation}>
                    Current Location
                  </a>
                  {/* Might not need this anymore? - <GetLocationButton getUserLocation={getUserLocation} /> */}
                </div>
                <div className="product-sidebar__heading">
                  <h2 className="text-lg font-bold text-gray-900">Text</h2>
                  <p className="text-gray-400">
                    Customize the print with your own text
                  </p>
                </div>
                <div className="my-7">
                  <h2 className="text-sm font-medium text-gray-900">Title</h2>
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
                    Subtitle
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
                <div className="product-sidebar__heading">
                  <h2 className="text-lg font-bold text-gray-900">Map Style</h2>
                  <p className="text-gray-400">
                    Change the color of the map and add finishing touches
                  </p>
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
                      setSelectedColor(selected)
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

                <div className="z-10">
                  {/* Size picker */}
                  <div className="mt-8">
                    

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
                  </div>

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
                  dangerouslySetInnerHTML={{ __html: productData.description }}
                />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">
                  Fabric &amp; Care
                </h2>

                <div className="mt-4 prose prose-sm text-gray-500">
                  <ul role="list">
                    {productData.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="sr-only">
                  Our Policies
                </h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {policies.map((policy) => (
                    <div
                      key={policy.name}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center"
                    >
                      <dt>
                        <policy.icon
                          className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="mt-4 text-sm font-medium text-gray-900">
                          {policy.name}
                        </span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500">
                        {policy.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapEditor
