export interface Product {
  id: number
  name: string
  href: string
  color: string
  price: number
  description?: string
  availableQty: number
  imageSrc: string
  imageAlt: string
  categories: string
}

export interface CartItem extends Product {
  quantity: number
}

export type Category = {
  name: string
  featured: Product[]
}
export type AppStateType = {
  products: Product[]
  categories: Category[]
  cart: CartItem[]
}

export type Page = {
  name: string
  href: string
}
export type Navigation = {
  categories: Category[]
}

export type ImageType = {
  src: string
  alt: string
  productId: number
}

export type ColorType = {
  productId: number
  name: string
  class: string
  selectedClass: string
}

export type SizesType = {
  productId: number
  name: string
  inStock: boolean
}

export type Order = {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  city: string
  address: string
  apartment: string
  postalCode: string
  cartItems: CartItem[]
}

