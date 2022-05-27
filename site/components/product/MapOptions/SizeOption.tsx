import { useEffect } from 'react'
import { SizeOptionProps } from './mapTypes'
import { useRenderSwatch } from './OptionsState'

const SizeOption: React.FC<SizeOptionProps> = ({
  option,
  selectedOptions,
  setSelectedOptions,
  selectedTypeSizes,
  // sizes,
}) => {
  
  return (
    <>
      <h2 className="uppercase font-medium text-sm tracking-wide">
        {option?.displayName}
      </h2>
      <div role="listbox" className="flex flex-row py-4 gap-1 sm:gap-2">
        {useRenderSwatch({option, selectedOptions, setSelectedOptions}, selectedTypeSizes)}
      </div>
    </>
  )
}

export default SizeOption
