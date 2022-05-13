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

<p>Qty</p>

<div className="flex flex-row">
<button
        type="button"
        onClick={decrease}
        className="border-0"
        //style={{ marginLeft: '-1px' }}
        disabled={value <= 1}
      >
        <Minus width={18} height={18} />
      </button>


        <input
          onChange={(e) =>
            Number(e.target.value) < max + 1 ? handleChange(e) : () => {}
          }
          className="border-0 ml-2 focus:outline-none "
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
        <Plus width={18} height={18} />
      </button>
</div>

{/* 


 */}
      <span onClick={handleRemove} className="hover:cursor-pointer">Remove</span>
    </div>
  )
}

export default Quantity
