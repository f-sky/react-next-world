import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const incentives = [
    {
      name: 'Free Worldwide Shipping',
      imageSrc:
        'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
      description:
        "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
    },
    {
      name: 'High Quality Material',
      imageSrc:
        'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
      description:
        "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
    },
    {
      name: '100% Satisfaction Guarantee',
      imageSrc:
        'https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg',
      description:
        "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
    },
  ]

  const productsData = [
    {
      id: 1,
      name: 'Create A Personalized Map',
      color: 'White and black',
      href: '#',
      imageSrc:
        '/assets/frame-1.png',
      imageAlt:
        'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
      price: '$40',
    },
    {
      id: 2,
      name: 'Day You Were Born Star Map',
      color: 'White and black',
      href: '#',
      imageSrc:
        '/assets/frame-1.png',
      imageAlt:
        'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
      price: '$40',
    },
    {
      id: 3,
      name: 'Zip Tote Basket',
      color: 'White and black',
      href: '#',
      imageSrc:
        '/assets/frame-1.png',
      imageAlt:
        'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
      price: '$40',
    },
    {
      id: 4,
      name: 'Zip Tote Basket',
      color: 'White and black',
      href: '#',
      imageSrc:
        '/assets/frame-1.png',
      imageAlt:
        'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
      price: '$40',
    },
    // More products...
  ]
  return (
    <>
      <div className="bg-gray-50">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">
            For Different Gift Occasions
          </h2>
          <p className="mt-4 text-xl text-gray-500 text-center">
            Pick different designs for special occasions
          </p>

          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {productsData.map((product) => (
              <div key={product.id}>
                <div className="relative text-center">
                  <div className="relative w-full">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-full h-full object-center object-contain"
                    />
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {/* Starting at $40 */}
                      Give a gift your loved one will never forget
                    </p>
                  </div>
                  <div className="mt-20 absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-36"
                    />
                    <p className="relative text-lg font-semibold text-white">
                      {product.price}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href={product.href}
                    className="relative flex bg-gray-800 border border-transparent rounded-md py-4 px-8 items-center justify-center text-lg font-medium text-white hover:bg-gray-800"
                  >
                    Start Designing{' '}
                    <span className="sr-only">, {product.name}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-white overflow-hidden py-20">
      <div className="relative max-w-7xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8 lg:py-20">
        <svg
          className="absolute top-full left-0 transform translate-x-80 -translate-y-24 lg:hidden"
          width={784}
          height={404}
          fill="none"
          viewBox="0 0 784 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={784} height={404} fill="url(#e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32)" />
        </svg>

        <svg
          className="hidden lg:block absolute right-full top-1/2 transform translate-x-1/2 -translate-y-1/2"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="56409614-3d62-4985-9a10-7ca758a8f4f0"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={784} fill="url(#56409614-3d62-4985-9a10-7ca758a8f4f0)" />
        </svg>

        <div className="relative lg:flex lg:items-center">
          <div className="hidden lg:block lg:flex-shrink-0">
            <img
              className="h-64 w-64 rounded-full xl:h-80 xl:w-80"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>

          <div className="relative lg:ml-10">
            <svg
              className="absolute top-0 left-0 transform -translate-x-8 -translate-y-24 h-36 w-36 text-indigo-200 opacity-50"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 144 144"
              aria-hidden="true"
            >
              <path
                strokeWidth={2}
                d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09 32.109 39.09 16.287 0 28.386-13.03 28.386-28.387 0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93 2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268 16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09 15.822 0 28.386-13.03 28.386-28.387 0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93 2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z"
              />
            </svg>
            <blockquote className="relative">
              <div className="text-2xl leading-9 font-medium text-gray-900">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias
                  molestiae. Numquam corrupti in laborum sed rerum et corporis.
                </p>
              </div>
              <footer className="mt-8">
                <div className="flex">
                  <div className="flex-shrink-0 lg:hidden">
                    <img
                      className="h-12 w-12 rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-4 lg:ml-0">
                    <div className="text-base font-medium text-gray-900">Judith Black</div>
                    <div className="text-base font-medium text-indigo-600">CEO, Tuple</div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-14 sm:px-2 sm:py-32 lg:px-4">
          <div className="max-w-2xl mx-auto px-4 lg:max-w-none">
            <div className="grid grid-cols-1 items-center gap-y-10 gap-x-16 lg:grid-cols-2">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
                  Printed Locally & Shipped Fast
                </h2>
                <p className="mt-4 text-gray-500">
                  At the beginning at least, but then we realized we could make
                  a lot more money if we kinda stopped caring about that. Our
                  new strategy is to write a bunch of things that look really
                  good in the headlines, then clarify in the small print but
                  hope people don't actually read it.
                </p>
              </div>
              <div className="aspect-w-3 aspect-h-2 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/incentives-07-hero.jpg"
                  alt=""
                  className="object-center object-cover"
                />
              </div>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
              {incentives.map((incentive) => (
                <div
                  key={incentive.name}
                  className="sm:flex lg:block text-center"
                >
                  <div className="sm:flex-shrink-0">
                    <img
                      className="w-16 h-16 mx-auto"
                      src={incentive.imageSrc}
                      alt=""
                    />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                    <h3 className="text-sm font-medium text-gray-900">
                      {incentive.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {incentive.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  )
  // return (
  //   <>
  //     <Grid variant="filled">
  //       {products.slice(0, 3).map((product: any, i: number) => (
  //         <ProductCard
  //           key={product.id}
  //           product={product}
  //           imgProps={{
  //             width: i === 0 ? 1080 : 540,
  //             height: i === 0 ? 1080 : 540,
  //             priority: true,
  //           }}
  //         />
  //       ))}
  //     </Grid>
  //     <Marquee variant="secondary">
  //       {products.slice(0, 3).map((product: any, i: number) => (
  //         <ProductCard key={product.id} product={product} variant="slim" />
  //       ))}
  //     </Marquee>
  //     <Hero
  //       headline=" Dessert dragée halvah croissant."
  //       description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
  //     />
  //     <Grid layout="B" variant="filled">
  //       {products.slice(0, 3).map((product: any, i: number) => (
  //         <ProductCard
  //           key={product.id}
  //           product={product}
  //           imgProps={{
  //             width: i === 0 ? 1080 : 540,
  //             height: i === 0 ? 1080 : 540,
  //           }}
  //         />
  //       ))}
  //     </Grid>
  //     <Marquee>
  //       {products.slice(3).map((product: any, i: number) => (
  //         <ProductCard key={product.id} product={product} variant="slim" />
  //       ))}
  //     </Marquee>
  //     {/* <HomeAllProductsGrid
  //       newestProducts={products}
  //       categories={categories}
  //       brands={brands}
  //     /> */}
  //   </>
  // )
}

Home.Layout = Layout
