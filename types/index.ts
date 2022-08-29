export interface Product {
  id: number
  name: string
  href: string
  color: string
  price: string
  description?:string
  availableQty: number
  imageSrc: string
  imageAlt: string
  categories:string
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
    name: string;
    href: string;
}
export type Navigation = {
  categories: Category[]
}