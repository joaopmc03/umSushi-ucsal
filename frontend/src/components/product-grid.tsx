'use client'

import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useApp } from '@/contexts/app-context'
import { useState } from 'react'
import { ProductForm } from '@/components/product-form'

interface ProductGridProps {
  onProductClick: (product: any) => void
}

export function ProductGrid({ onProductClick }: ProductGridProps) {
  const { products, deleteProduct, selectedCategory } = useApp()
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setShowProductForm(true)
  }

  const handleDelete = (productId: number) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct(productId)
    }
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold'>{selectedCategory}</h2>
        <Button
          onClick={() => {
            setEditingProduct(null)
            setShowProductForm(true)
          }}
          className='bg-slate-600 hover:bg-slate-700'
        >
          <Plus size={16} className='mr-2' />
          Adicionar Produto
        </Button>
      </div>

      <div className='space-y-4'>
        {products.map((product) => (
          <div
            key={product.id}
            className='bg-gray-200 rounded-lg p-4 flex items-center justify-between'
          >
            <div className='flex items-center gap-4'>
              <Button
                size='sm'
                variant='outline'
                className='rounded-full w-8 h-8 p-0'
                onClick={() => onProductClick(product)}
              >
                <Plus size={16} />
              </Button>
              <div className='flex-1'>
                <h3 className='font-semibold text-slate-700'>{product.name}</h3>
                <p className='text-sm text-gray-600 mb-2'>
                  {product.description}
                </p>
                <p className='font-semibold text-slate-700'>
                  R$ {product.price.toFixed(2)}
                </p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Button
                size='sm'
                variant='outline'
                onClick={() => handleEdit(product)}
              >
                <Edit size={16} />
              </Button>
              <Button
                size='sm'
                variant='outline'
                onClick={() => handleDelete(product.id)}
                className='text-red-600 hover:text-red-700'
              >
                <Trash2 size={16} />
              </Button>
              <div className='w-20 h-20 bg-gray-100 border border-gray-300 rounded flex items-center justify-center ml-4'>
                <div className='text-gray-400 text-xs'>Imagem</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowProductForm(false)
            setEditingProduct(null)
          }}
        />
      )}
    </div>
  )
}

