import { Dispatch, SetStateAction } from "react";
import type { ProductOption } from '@commerce/types/product'
import { SelectedOptions } from '../helpers'

export interface ProductTypeValue {
  label: string
  sizeIds: Array<number>
}

export interface ProductType {
  id: number
  displayName: string
  values: ProductTypeValue[]
}

export interface ProductSize {
  id: number
  name: string
  inStock: boolean
  landscapeName: string
}


export interface OptionsProps {
  options: ProductOption[]
  selectedOptions: SelectedOptions
  setSelectedOptions: Dispatch<SetStateAction<SelectedOptions>>
  prodcutTypes: ProductType
  selectedProductType: number
  setSelectedProductType: Dispatch<SetStateAction<number>>
  sizes: ProductSize[]
  selectedTypeSizes: number[]
  setSelectedTypeSizes: Dispatch<SetStateAction<number[]>>
}

export interface ProductOptionProps {
  option: ProductOption | ProductType
  selectedOptions: SelectedOptions
  setSelectedOptions: Dispatch<SetStateAction<SelectedOptions>>
}

export interface ProductTypeProps {
  option: ProductType
  selectedProductType: number
  setSelectedProductType: Dispatch<SetStateAction<number>>
  selectedOptions: SelectedOptions
  setSelectedOptions: Dispatch<SetStateAction<SelectedOptions>>
  setSelectedTypeSizes: Dispatch<SetStateAction<number[]>>
}

export interface SizeOptionProps {  
  option: ProductOption
  selectedOptions: SelectedOptions
  setSelectedOptions: Dispatch<SetStateAction<SelectedOptions>>
  selectedTypeSizes: number[]
}
