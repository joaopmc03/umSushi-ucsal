'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { ProductGrid } from '@/components/product-grid'
import { Cart } from '@/components/cart'
import { CategoryTabs } from '@/components/category-tabs'
import { InfoCards } from '@/components/info-cards'
import { HorarioModal } from '@/components/horario-modal'
import { ProductModal } from '@/components/product-modal'
import { useApp } from '@/contexts/app-context'

export default function HomePage() {
  const [showHorarioModal, setShowHorarioModal] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { cartItems } = useApp()

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />

      <div className='flex-1 flex'>
        <main className='flex-1 p-6'>
          <Header onHorarioClick={() => setShowHorarioModal(true)} />

          <InfoCards />

          <CategoryTabs />

          <ProductGrid
            onProductClick={(product) => {
              setSelectedProduct(product)
              setShowProductModal(true)
            }}
          />
        </main>

        <Cart />
      </div>

      {showHorarioModal && (
        <HorarioModal onClose={() => setShowHorarioModal(false)} />
      )}

      {showProductModal && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setShowProductModal(false)}
        />
      )}
    </div>
  )
}

