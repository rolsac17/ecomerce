import React from 'react'
import { ProductCardWishList } from '../product-card-wish-list'

export const ProductGridCard: React.FC = ({children}) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {children}
    </div>
  )
}
