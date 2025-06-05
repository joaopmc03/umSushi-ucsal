'use client'

import { X, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useApp } from '@/contexts/app-context'

interface ProductModalProps {
  product: any
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useApp()
  const [quantity, setQuantity] = useState(1)
  const [observations, setObservations] = useState('')

  const handleAddToCart = () => {
    addToCart(product, quantity, observations)
    onClose()
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-96 relative'>
        <Button
          variant='ghost'
          size='sm'
          onClick={onClose}
          className='absolute top-2 right-2'
        >
          <X size={20} />
        </Button>

        <div className='flex'>
          <div className='flex-1 pr-4'>
            <h2 className='text-lg font-semibold text-slate-700 mb-2'>
              {product.name}
            </h2>
            <p className='text-sm text-gray-600 mb-4'>{product.description}</p>
            <p className='font-semibold text-slate-700 mb-4'>
              R$ {product.price.toFixed(2)}
            </p>

            <div className='mb-4'>
              <label className='block text-sm font-medium mb-2'>
                Observações
              </label>
              <Textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                className='w-full'
                rows={3}
                placeholder='Alguma observação especial?'
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={16} />
                </Button>
                <span className='font-medium'>{quantity}</span>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>

              <Button
                className='bg-slate-600 hover:bg-slate-700'
                onClick={handleAddToCart}
              >
                Adicionar
              </Button>
            </div>
          </div>

          <div className='w-20 h-20 bg-gray-100 border border-gray-300 rounded flex items-center justify-center'>
            <div className='text-gray-400 text-xs'>Imagem</div>
          </div>
        </div>
      </div>
    </div>
  )
}

