import React, { FC } from 'react'
import s from './Quantity.module.css'
import { Cross, Plus, Minus } from '@components/icons'
import cn from 'clsx'
export interface QuantityProps {
  value: number
  increase: () => any
  decrease: () => any
  handleRemove: React.MouseEventHandler<HTMLButtonElement>
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  max?: number
}

const Quantity: FC<QuantityProps> = ({
  value,
  increase,
  decrease,
  handleChange,
  handleRemove,
  max = 6,
}) => {
  return (
    <div className="flex flex-1 items-end justify-between text-md">
      {/* 
      <button className={s.actions} onClick={handleRemove}>
        <Cross width={20} height={20} />
      </button>
 */}



      <div className="flex flex-row items-center">
      <p className="mr-3">Qty</p>

        <div className="flex items-center">
        <button
          type="button"
          onClick={decrease}
          className="border-0"
          //style={{ marginLeft: '-1px' }}
          disabled={value <= 1}
        >
          <Minus width={14} height={14} />
        </button>


        <input
          onChange={(e) =>
            Number(e.target.value) < max + 1 ? handleChange(e) : () => {}
          }
          className="border-0 ml-4 focus:outline-none focus:ring-0 "
          value={value}
          type="number"
          max={max}
          min="0"
          readOnly
        />

        <button
          type="button"
          onClick={increase}
          className="border-0"
          //style={{ marginLeft: '-1px' }}
          disabled={value < 1 || value >= max}
        >
          <Plus width={14} height={14} />
        </button>

        </div>
      </div>

      <button onClick={handleRemove} className="hover:cursor-pointer">
        Remove
      </button>
    </div>
  )
}

export default Quantity
