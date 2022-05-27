import { FC } from 'react'
import { ProductTypeProps } from './mapTypes'
import { useRenderSwatch } from './OptionsState'

const ProductTypeOption: FC<ProductTypeProps> = ({
  option,
  selectedProductType,
  setSelectedProductType,
  selectedOptions,
  setSelectedOptions,
  setSelectedTypeSizes,
}) => {
  
  return (
    <>
      <h2 className="uppercase font-medium text-sm tracking-wide">
        {option?.displayName}
      </h2>
      <div role="listbox" className="flex flex-row py-4">
        {useRenderSwatch({option, selectedOptions, setSelectedOptions}, [], option.values, setSelectedTypeSizes, selectedProductType, setSelectedProductType)}
      </div>
    </>
  )
}

export default ProductTypeOption
