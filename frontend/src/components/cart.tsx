'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Edit, Minus, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useApp } from '@/contexts/app-context'

export function Cart() {
  const { cartItems, updateCartItem, removeFromCart, addresses } = useApp()

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const deliveryFee = 5.99
  const total = subtotal + deliveryFee

  const defaultAddress =
    addresses.find((addr) => addr.isDefault) || addresses[0]

  return (
    <div className='w-80 bg-white border-l border-gray-200 p-6'>
      <div className='mb-6'>
        {defaultAddress && (
          <div className='flex items-center gap-2 text-gray-700 mb-4'>
            <Edit size={16} />
            <span>
              {defaultAddress.street} {defaultAddress.number}
            </span>
          </div>
        )}

        <div className='space-y-3 mb-4'>
          {cartItems.map((item) => (
            <div key={item.id} className='border-b border-gray-100 pb-3'>
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2'>
                  <Edit size={14} />
                  <span className='text-sm font-medium'>{item.name}</span>
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => removeFromCart(item.id)}
                  className='text-red-600 hover:text-red-700 p-1'
                >
                  <Trash2 size={14} />
                </Button>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => updateCartItem(item.id, item.quantity - 1)}
                    className='w-6 h-6 p-0'
                  >
                    <Minus size={12} />
                  </Button>
                  <span className='text-sm w-6 text-center'>
                    {item.quantity}
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => updateCartItem(item.id, item.quantity + 1)}
                    className='w-6 h-6 p-0'
                  >
                    <Plus size={12} />
                  </Button>
                </div>
                <span className='text-sm font-medium'>
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>

              {item.observations && (
                <p className='text-xs text-gray-500 mt-1'>
                  Obs: {item.observations}
                </p>
              )}
            </div>
          ))}
        </div>

        {cartItems.length === 0 && (
          <div className='text-center text-gray-500 py-8'>
            <p>Seu carrinho está vazio</p>
          </div>
        )}

        {cartItems.length > 0 && (
          <>
            <Input placeholder='Cupom' className='mb-4' />

            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span>Subtotal:</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Taxa de Entrega:</span>
                <span>R$ {deliveryFee.toFixed(2)}</span>
              </div>
              <div className='flex justify-between font-semibold'>
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <Link href='/checkout'>
              <Button className='w-full mt-4 bg-slate-600 hover:bg-slate-700'>
                Checkout
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

