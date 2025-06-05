'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, ArrowLeft, Clock, MapPin, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useApp } from '@/contexts/app-context'

export default function PedidoSucessoPage() {
  const router = useRouter()
  const { orders } = useApp()
  const [pedido, setPedido] = useState<any>(null)

  useEffect(() => {
    if (orders.length > 0) {
      setPedido(orders[orders.length - 1])
    } else {
      router.push('/')
    }
  }, [orders, router])

  if (!pedido) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-gray-500'>Carregando...</p>
        </div>
      </div>
    )
  }

  const dataFormatada = new Date(pedido.createdAt).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const tempoEstimado =
    pedido.deliveryOption === 'retirada' ? '30 minutos' : '45-60 minutos'

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-md w-full'>
        <div className='flex flex-col items-center mb-6'>
          <div className='w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4'>
            <CheckCircle size={40} className='text-green-600' />
          </div>
          <h1 className='text-2xl font-bold text-center'>
            Pedido Realizado com Sucesso!
          </h1>
          <p className='text-gray-600 text-center mt-2'>
            Seu pedido #{pedido.id.toString().padStart(4, '0')} foi confirmado e
            está sendo preparado.
          </p>
        </div>

        <div className='border-t border-b border-gray-200 py-4 mb-6'>
          <div className='flex items-center gap-3 mb-4'>
            <Clock size={20} className='text-slate-600' />
            <div>
              <p className='text-sm font-medium'>Tempo estimado</p>
              <p className='text-sm text-gray-600'>{tempoEstimado}</p>
            </div>
          </div>

          <div className='flex items-center gap-3 mb-4'>
            <MapPin size={20} className='text-slate-600' />
            <div>
              <p className='text-sm font-medium'>Endereço de entrega</p>
              <p className='text-sm text-gray-600'>
                {pedido.deliveryAddress.street}, {pedido.deliveryAddress.number}
                {pedido.deliveryAddress.complement &&
                  `, ${pedido.deliveryAddress.complement}`}
              </p>
              <p className='text-sm text-gray-600'>
                {pedido.deliveryAddress.neighborhood},{' '}
                {pedido.deliveryAddress.city} - CEP{' '}
                {pedido.deliveryAddress.zipCode}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <CreditCard size={20} className='text-slate-600' />
            <div>
              <p className='text-sm font-medium'>Forma de pagamento</p>
              <p className='text-sm text-gray-600'>
                {pedido.paymentMethod === 'credito'
                  ? 'Cartão de Crédito'
                  : pedido.paymentMethod === 'debito'
                  ? 'Cartão de Débito'
                  : 'Pix'}
              </p>
            </div>
          </div>
        </div>

        <div className='mb-6'>
          <h2 className='font-semibold mb-3'>Resumo do pedido</h2>
          <div className='space-y-2'>
            {pedido.items.map((item: any) => (
              <div key={item.id} className='flex justify-between text-sm'>
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className='border-t border-gray-200 mt-4 pt-4'>
            <div className='flex justify-between text-sm font-medium'>
              <span>Total</span>
              <span>R$ {pedido.total.toFixed(2)}</span>
            </div>
            <div className='text-xs text-gray-500 mt-1'>
              Pedido realizado em {dataFormatada}
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <Link href='/' className='w-full'>
            <Button className='w-full bg-slate-600 hover:bg-slate-700'>
              <ArrowLeft size={16} className='mr-2' />
              Voltar ao cardápio
            </Button>
          </Link>
          <Link href='/pedidos' className='w-full'>
            <Button variant='outline' className='w-full'>
              Ver meus pedidos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
