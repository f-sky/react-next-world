import { FC } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from '@heroicons/react/outline'
import { Button } from '@components/ui'
import { Bag } from '@components/icons'
import s from './TopNav.module.css'

import cn from 'clsx'
import Link from 'next/link'
import useCart from '@framework/cart/use-cart'
import { useUI } from '@components/ui/context'
import useCustomer from '@framework/customer/use-customer'
import React from 'react'

import type { LineItem } from '@commerce/types/cart'

const countItem = (count: number, item: LineItem) => count + item.quantity

// const UserNav: React.FC<{
//   className?: string
// }> = ({ className }) => {
//   const { data } = useCart()
//   const { data: isCustomerLoggedIn } = useCustomer()
//   const {
//     toggleSidebar,
//     closeSidebarIfPresent,
//     openModal,
//     setSidebarView,
//     openSidebar,
//   } = useUI()

//   const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0
//   const DropdownTrigger = isCustomerLoggedIn
//     ? DropdownTriggerInst
//     : React.Fragment

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Our Products',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Gift Occasions',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt:
            'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    // { name: 'Our Story', href: '#' },
    { name: 'Inspiration', href: '#' },
    { name: 'Contact', href: '#' },
  ],
}

// import Link from 'next/link'
// import s from './Navbar.module.css'
// import NavbarRoot from './NavbarRoot'
// import { Logo, Container } from '@components/ui'
// import { Searchbar, UserNav } from '@components/common'

// interface Link {
//   href: string
//   label: string
// }

// interface NavbarProps {
//   links?: Link[]
// }

// const Navbar: FC<NavbarProps> = ({ links }) => (
//   <NavbarRoot>
//     <Container clean className="mx-auto max-w-8xl px-6">
//       <div className={s.nav}>
//         <div className="flex items-center flex-1">
//           <Link href="/">
//             <a className={s.logo} aria-label="Logo">
//               <Logo />
//             </a>
//           </Link>
//           <nav className={s.navMenu}>
//             <Link href="/search">
//               <a className={s.link}>All</a>
//             </Link>
//             {links?.map((l) => (
//               <Link href={l.href} key={l.href}>
//                 <a className={s.link}>{l.label}</a>
//               </Link>
//             ))}
//           </nav>
//         </div>
//         {process.env.COMMERCE_SEARCH_ENABLED && (
//           <div className="justify-center flex-1 hidden lg:flex">
//             <Searchbar />
//           </div>
//         )}
//         <div className="flex items-center justify-end flex-1 space-x-8">
//           <UserNav />
//         </div>
//       </div>
//       {process.env.COMMERCE_SEARCH_ENABLED && (
//         <div className="flex pb-4 lg:px-6 lg:hidden">
//           <Searchbar id="mobile-search" />
//         </div>
//       )}
//     </Container>
//   </NavbarRoot>
// )

// export default Nav

interface Link {
  href: string
  label: string
}

interface NavProps {
  links?: Link[]
}

const Nav: FC<NavProps> = ({ links }) => {
  const { data } = useCart()
  const { data: isCustomerLoggedIn } = useCustomer()
  const {
    toggleSidebar,
    closeSidebarIfPresent,
    openModal,
    setSidebarView,
    openSidebar,
  } = useUI()

  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0
  // const DropdownTrigger = isCustomerLoggedIn
  //   ? DropdownTriggerInst
  //   : React.Fragment
  return (
    <nav
      aria-label="Top"
      className="relative z-20 bg-white bg-opacity-90 backdrop-filter backdrop-blur-xl shadow"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center">
          <button
            type="button"
            className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
            // onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Logo */}
          <div className="ml-4 flex lg:ml-0">
            <a href="/">
              <span className="sr-only">NextWorld</span>
              <img
                style={{ width: '150px' }}
                className="h-5"
                src="/assets/nextworldlogo.png"
                alt=""
              />
            </a>
          </div>

          {/* Flyout menus */}
          <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
            <div className="h-full flex space-x-8">
              {navigation.categories.map((category) => (
                <Popover key={category.name} className="flex">
                  {({ open }) => (
                    <>
                      <div className="relative flex">
                        <Popover.Button
                          className={classNames(
                            open
                              ? 'border-indigo-600 text-indigo-600'
                              : 'border-transparent text-gray-700 hover:text-gray-800',
                            'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                          )}
                        >
                          {category.name}
                        </Popover.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Popover.Panel className="absolute top-full inset-x-0 bg-white text-sm text-gray-500">
                          {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                          <div
                            className="absolute inset-0 top-1/2 bg-white shadow"
                            aria-hidden="true"
                          />
                          {/* Fake border when menu is open */}
                          <div
                            className="absolute inset-0 top-0 h-px max-w-7xl mx-auto px-8"
                            aria-hidden="true"
                          >
                            <div
                              className={classNames(
                                open ? 'bg-gray-200' : 'bg-transparent',
                                'w-full h-px transition-colors ease-out duration-200'
                              )}
                            />
                          </div>

                          <div className="relative">
                            <div className="max-w-7xl mx-auto px-8">
                              <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                  {category.featured.map((item) => (
                                    <div
                                      key={item.name}
                                      className="group relative text-base sm:text-sm"
                                    >
                                      <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                        <img
                                          src={item.imageSrc}
                                          alt={item.imageAlt}
                                          className="object-center object-cover"
                                        />
                                      </div>
                                      <a
                                        href={item.href}
                                        className="mt-6 block font-medium text-gray-900"
                                      >
                                        <span
                                          className="absolute z-10 inset-0"
                                          aria-hidden="true"
                                        />
                                        {item.name}
                                      </a>
                                      <p aria-hidden="true" className="mt-1">
                                        Shop now
                                      </p>
                                    </div>
                                  ))}
                                </div>
                                <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                  {category.sections.map((section) => (
                                    <div key={section.name}>
                                      <p
                                        id={`${section.name}-heading`}
                                        className="font-medium text-gray-900"
                                      >
                                        {section.name}
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby={`${section.name}-heading`}
                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                      >
                                        {section.items.map((item) => (
                                          <li key={item.name} className="flex">
                                            <a
                                              href={item.href}
                                              className="hover:text-gray-800"
                                            >
                                              {item.name}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ))}

              {navigation.pages.map((page) => (
                <a
                  key={page.name}
                  href={page.href}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  {page.name}
                </a>
              ))}
            </div>
          </Popover.Group>

          <div className="ml-auto flex items-center">
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Sign in
              </a>
              <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Create account
              </a>
            </div>

            {/* <div className="hidden lg:ml-8 lg:flex">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-800 flex items-center"
              >
                <img
                  src="https://tailwindui.com/img/flags/flag-canada.svg"
                  alt=""
                  className="w-5 h-auto block flex-shrink-0"
                />
                <span className="ml-3 block text-sm font-medium">CAD</span>
                <span className="sr-only">, change currency</span>
              </a>
            </div> */}

            {/* Search */}
            {/* <div className="flex lg:ml-6">
              <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Search</span>
                <SearchIcon className="w-6 h-6" aria-hidden="true" />
              </a>
            </div>
 */}
            {/* Cart */}
            <div className="ml-4 flow-root lg:ml-6">
              <Button
                className={s.item}
                variant="naked"
                onClick={() => {
                  setSidebarView('CART_VIEW')
                  toggleSidebar()
                }}
              >
                <Bag />
                {itemsCount > 0 && (
                  <span className={s.bagCount}>{itemsCount}</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
