import { ChangeEvent, FocusEventHandler, useEffect, useState } from 'react'
import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import s from './CartItem.module.css'
import { useUI } from '@components/ui/context'
import type { LineItem } from '@commerce/types/cart'
import usePrice from '@framework/product/use-price'
import useUpdateItem from '@framework/cart/use-update-item'
import useRemoveItem from '@framework/cart/use-remove-item'
import Quantity from '@components/ui/Quantity'

type ItemOption = {
  name: string
  nameId: number
  value: string
  valueId: number
}

const placeholderImg = '/product-img-placeholder.svg'

const CartItem = ({
  item,
  variant = 'default',
  currencyCode,
  ...rest
}: {
  variant?: 'default' | 'display'
  item: LineItem
  currencyCode: string
}) => {
  const { closeSidebarIfPresent } = useUI()
  const [removing, setRemoving] = useState(false)
  const [quantity, setQuantity] = useState<number>(item.quantity)
  const removeItem = useRemoveItem()
  const updateItem = useUpdateItem({ item })

  const { price } = usePrice({
    amount: item.variant.price * item.quantity,
    baseAmount: item.variant.listPrice * item.quantity,
    currencyCode,
  })

  const handleChange = async ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(value))
    await updateItem({ quantity: Number(value) })
  }

  const increaseQuantity = async (n = 1) => {
    const val = Number(quantity) + n
    setQuantity(val)
    await updateItem({ quantity: val })
  }

  const handleRemove = async () => {
    setRemoving(true)
    try {
      await removeItem(item)
    } catch (error) {
      setRemoving(false)
    }
  }

  // TODO: Add a type for this
  const options = (item as any).options

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
    }
    // TODO: currently not including quantity in deps is intended, but we should
    // do this differently as it could break easily
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.quantity])

  return (
    <ul
      role="list"
      className="border-t border-b border-gray-200 divide-y divide-gray-200"
    >
      <li
        className={cn(s.root, {
          'opacity-50 pointer-events-none': removing,
        })}
        {...rest}
      >
        <div className="flex flex-row space-x-4 py-4">
          <div //className="w-16 h-16 bg-violet relative overflow-hidden cursor-pointer z-0"
          >
            <Link href={`/product/${item.path}`}>
              <a>
                <Image
                  onClick={() => closeSidebarIfPresent()}
                  //className={s.productImage}
                  className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                  width={150}
                  height={150}
                  src={item.variant.image?.url || placeholderImg}
                  alt={item.variant.image?.altText || 'Product Image'}
                  unoptimized
                />
              </a>
            </Link>
          </div>

          <div className="flex-1 flex flex-col text-base">
            <span
              //className={s.productName}
              className="font-semibold"
              onClick={() => closeSidebarIfPresent()}
            >
              {item.name}
            </span>
            {options && options.length > 0 && (
              <div className="flex flex-col items-start mt-4 pb-1">
                {options.map((option: ItemOption, i: number) => (
                  <div
                    key={`${item.id}-${option.name}`}
                    className="text-sm  inline-flex items-center justify-center"
                  >
                    <span className="font-semibold">{option.name}:</span>
                    {option.name === 'Color' ? (
                      <span
                        className="w-5 h-auto p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden"
                        style={{
                          backgroundColor: `${option.value}`,
                        }}
                      ></span>
                    ) : (
                      <span className="h-auto p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden">
                        {option.value}
                      </span>
                    )}
                    {i === options.length - 1 ? '' : <span className="mr-3" />}
                  </div>
                ))}
              </div>
            )}
            {variant === 'display' && (
              <div className="text-sm tracking-wider">{quantity}x</div>
            )}
          </div>
          <div className="flex flex-col justify-between space-y-2 text-md font-semibold">
            <span>{price}</span>
          </div>
        </div>
        {variant === 'default' && (
          <Quantity
            value={quantity}
            handleRemove={handleRemove}
            handleChange={handleChange}
            increase={() => increaseQuantity(1)}
            decrease={() => increaseQuantity(-1)}
          />
        )}
      </li>
    </ul>
  )
}

export default CartItem
