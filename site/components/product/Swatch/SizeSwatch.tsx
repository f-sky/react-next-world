import React, { useEffect, useState } from 'react'
import { Check } from '@components/icons'
import { ButtonProps } from '@components/ui/Button'

interface SwatchProps {
  active?: boolean
  children?: any
  className?: string
  variant?: 'size' | 'color' | string
  color?: string
  label?: string | null
}

const SizeSwatch: React.FC<Omit<ButtonProps, 'variant'> & SwatchProps> = ({
  active,
  className,
  color = '',
  label = null,
  variant = 'size',
  ...props
}) => {
  const [name, setName] = useState("")
  const [dimension, setDimension] = useState("")

  useEffect(() => {
    if (label) {
      let words = label.split('-');

      if(words.length == 1) {
        setDimension(words[0])
      }else {
        setName(words[1].trim())
        let dimStr = words[2].trim()
        setDimension(dimStr)
      }
    }
  }, [label, active])

  return (
    <>{label ?
      (
        <span
          className={`${active? "border-orange-400" : "border-gray-400"} relative cursor-pointer block border-[1px] border-solid text-center`}
          {...props}
        >
          <div className={`${active? "text-white bg-orange-400" : "text-gray-500"} px-2.5 sm:px-5 py-1 text-sm sm:text-[15px] font-bold text-gray-500`}>
            {name}
          </div>
          <div className="px-2.5 sm:px-5 py-4 sm:py-6 text-xs sm:text-sm text-gray-500">
            {dimension}
          </div>
          {active && <div className="absolute bottom-0 right-0 bg-orange-400 text-white w-4 h-4 sm:w-6 sm:h-6">
            <Check
              width="100%"
              height="100%"
            />
          </div>
          }
        </span>
      ): (
        <span>{label}</span>
      )}
    </>
  )
}

export default React.memo(SizeSwatch)
