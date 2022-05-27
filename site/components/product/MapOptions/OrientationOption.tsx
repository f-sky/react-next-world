import { FC } from "react";
import { ProductOptionProps } from './mapTypes'
import { useRenderSwatch } from './OptionsState'

const OrientationOption: FC<ProductOptionProps> = ({
  option,
  selectedOptions,
  setSelectedOptions,
}) => {
  return (
    <>
      <h2 className="uppercase font-medium text-sm tracking-wide">
        {option?.displayName}
      </h2>
      <div role="listbox" className="flex flex-row py-4">
        {useRenderSwatch({option, selectedOptions, setSelectedOptions}, [])}
      </div>
    </>
  )
}

export default OrientationOption
