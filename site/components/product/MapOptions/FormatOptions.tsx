import { FC, memo, useState } from 'react'
import { OptionsProps } from './mapTypes'

import ProductTypeOption from './ProductTypeOption'
import SizeOption from './SizeOption'
import OrientationOption from './OrientationOption'

const FormatOptions: FC<OptionsProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
  prodcutTypes,
  selectedProductType,
  setSelectedProductType,
  selectedTypeSizes,
  setSelectedTypeSizes,
}) => {
  
  return (
    <>
      <ProductTypeOption
        option={prodcutTypes}
        selectedProductType={selectedProductType}
        setSelectedProductType={setSelectedProductType}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        setSelectedTypeSizes={setSelectedTypeSizes}
      />
      <SizeOption
        option={options[0]}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        selectedTypeSizes={selectedTypeSizes}
      />
      <OrientationOption
        option={options[1]}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </>
  )
}

export default memo(FormatOptions)
