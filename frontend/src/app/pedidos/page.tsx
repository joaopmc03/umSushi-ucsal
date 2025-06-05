'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { useApp } from '@/contexts/app-context'
import { Button } from '@/components/ui/button'
import { Clock, Package, CheckCircle, X } from 'lucide-react'
import Link from 'next/link'

export default function PedidosPage() {
  const { orders } = useApp()
  const [selectedStatus, setSelectedStatus] = useState('todos')

  const filteredOrders =
    selectedStatus === 'todos'
      ? orders
      : orders.filter((order) => order.status === selectedStatus)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return <Clock size={16} className='text-blue-500' />
      case 'Em preparo':
        return <Package size={16} className='text-orange-500' />
      case 'Entregue':
        return <CheckCircle size={16} className='text-green-500' />
      case 'Cancelado':
        return <X size={16} className='text-red-500' />
      default:
        return <Clock size={16} className='text-blue-500' />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return 'bg-blue-100 text-blue-800'
      case 'Em preparo':
        return 'bg-orange-100 text-orange-800'
      case 'Entregue':
        return 'bg-green-100 text-green-800'
      case 'Cancelado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />

      <div className='flex-1 p-6'>
        <h1 className='text-2xl font-semibold text-slate-700 mb-6'>
          Meus Pedidos
        </h1>

        <div className='bg-white rounded-lg p-6'>
          <div className='flex gap-2 mb-6 overflow-x-auto'>
            <Button
              variant={selectedStatus === 'todos' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('todos')}
              className={selectedStatus === 'todos' ? 'bg-slate-600' : ''}
            >
              Todos
            </Button>
            <Button
              variant={selectedStatus === 'Confirmado' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('Confirmado')}
              className={selectedStatus === 'Confirmado' ? 'bg-slate-600' : ''}
            >
              Confirmados
            </Button>
            <Button
              variant={selectedStatus === 'Em preparo' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('Em preparo')}
              className={selectedStatus === 'Em preparo' ? 'bg-slate-600' : ''}
            >
              Em preparo
            </Button>
            <Button
              variant={selectedStatus === 'Entregue' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('Entregue')}
              className={selectedStatus === 'Entregue' ? 'bg-slate-600' : ''}
            >
              Entregues
            </Button>
            <Button
              variant={selectedStatus === 'Cancelado' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('Cancelado')}
              className={selectedStatus === 'Cancelado' ? 'bg-slate-600' : ''}
            >
              Cancelados
            </Button>
          </div>

          {filteredOrders.length === 0 ? (
            <div className='text-center py-10'>
              <p className='text-gray-500'>Nenhum pedido encontrado</p>
              <Link href='/'>
                <Button className='mt-4 bg-slate-600 hover:bg-slate-700'>
                  Fazer um pedido
                </Button>
              </Link>
            </div>
          ) : (
            <div className='space-y-4'>
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className='border border-gray-200 rounded-lg p-4'
                >
                  <div className='flex justify-between items-center mb-3'>
                    <div className='flex items-center gap-2'>
                      <span className='font-semibold'>
                        Pedido #{order.id.toString().padStart(4, '0')}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className='ml-1'>{order.status}</span>
                      </span>
                    </div>
                    <span className='text-sm text-gray-500'>
                      {new Date(order.createdAt).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div className='space-y-1 mb-3'>
                    {order.items.slice(0, 3).map((item: any) => (
                      <div
                        key={item.id}
                        className='text-sm flex justify-between'
                      >
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className='text-sm text-gray-500'>
                        + {order.items.length - 3} itens
                      </div>
                    )}
                  </div>

                  <div className='flex justify-between items-center border-t border-gray-100 pt-3'>
                    <div>
                      <div className='text-sm'>
                        <span className='font-medium'>Total:</span> R${' '}
                        {order.total.toFixed(2)}
                      </div>
                      <div className='text-xs text-gray-500'>
                        {order.deliveryAddress.street},{' '}
                        {order.deliveryAddress.number}
                      </div>
                    </div>
                    <Button variant='outline' size='sm'>
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
