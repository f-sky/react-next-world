import React, { Dispatch, SetStateAction } from "react";
import { ProductOptionProps, ProductTypeValue, ProductSize } from './mapTypes'
import { Swatch, SizeSwatch } from '@components/product'

const swatches = {
  common: Swatch,
  size: SizeSwatch
};

export const useRenderSwatch = (
  productOptions: ProductOptionProps,
  selectedTypeSizes: number[],
  prodcutTypes?: ProductTypeValue[],
  setSelectedTypeSizes?: Dispatch<SetStateAction<number[]>>,
  selectedProductType?: number,
  setSelectedProductType?: Dispatch<SetStateAction<number>>
) => {
  const { option, selectedOptions, setSelectedOptions } = productOptions;

  return (
    <>
      {option?.values.map((v, i: number) => {
        
        let active = selectedOptions[option.displayName.toLowerCase()]        
        if (selectedTypeSizes.length == 0 || selectedTypeSizes.includes(i)) {
          const opt = option.displayName.toLowerCase();
          const MapSwatch = opt == "size" ? swatches.size : swatches.common;

          let isActive = false;
          if(opt.replace(" ", '') == "producttype")
            if(selectedProductType == i) isActive = true;

          return (
            <MapSwatch
              key={`${option.id}-${i}`}
              active={v.label.toLowerCase() === active || isActive}
              variant={option.displayName}
              color=''
              label={v.label}
              onClick={() => {
                if(opt == "size" || opt == "orientation") {
                  setSelectedOptions((selectedOptions) => {
                    return {
                      ...selectedOptions,
                      [option.displayName.toLowerCase()]: v.label.toLowerCase(),
                    }
                  })
                }

                if(opt.replace(" ", '') == "producttype"){
                  setSelectedProductType && setSelectedProductType(i);
                  setSelectedTypeSizes && prodcutTypes && setSelectedTypeSizes(prodcutTypes[i].sizeIds);                  
                }
              }}
            />
          )
        }
      })}
    </>
  )
}
