'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useApp } from '@/contexts/app-context'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, addresses, createOrder } = useApp()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('credito')
  const [deliveryOption, setDeliveryOption] = useState('retirada')
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || 0)
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const deliveryFee = deliveryOption === 'retirada' ? 5.99 : 5.99
  const total = subtotal + deliveryFee

  const handleFinishOrder = () => {
    const address = addresses.find((addr) => addr.id === selectedAddress)
    if (!address) return

    setIsProcessing(true)

    setTimeout(() => {
      createOrder({
        items: cartItems,
        total,
        status: 'Confirmado',
        deliveryAddress: address,
        paymentMethod,
      })

      router.push('/pedido-sucesso')
    }, 1500)
  }

  if (cartItems.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold mb-4'>Carrinho vazio</h1>
          <Link href='/'>
            <Button className='bg-slate-600 hover:bg-slate-700'>
              Voltar ao cardápio
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const renderStep1 = () => (
    <div className='max-w-md mx-auto bg-white rounded-lg p-6'>
      <div className='flex items-center gap-4 mb-6'>
        <Link href='/'>
          <Button variant='ghost' size='sm'>
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <h1 className='text-xl font-semibold text-slate-700'>Checkout</h1>
      </div>

      <div className='mb-6'>
        <h2 className='font-semibold mb-4'>Detalhes do pedido</h2>
        <div className='space-y-2 text-sm mb-4'>
          {cartItems.map((item) => (
            <div key={item.id} className='flex justify-between'>
              <span>
                {item.quantity}x {item.name}
              </span>
              <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <Input placeholder='Cupom' className='mb-4' />

        <div className='space-y-2 text-sm'>
          <div className='flex justify-between'>
            <span>Subtotal: R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className='flex justify-between'>
            <span>Taxa de Entrega: R$ {deliveryFee.toFixed(2)}</span>
          </div>
          <div className='flex justify-between font-semibold'>
            <span>Total: R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button
        className='w-full bg-slate-600 hover:bg-slate-700'
        onClick={() => setStep(2)}
      >
        Continuar
      </Button>
    </div>
  )

  const renderStep2 = () => (
    <div className='max-w-md mx-auto bg-white rounded-lg p-6'>
      <div className='flex items-center gap-4 mb-6'>
        <Button variant='ghost' size='sm' onClick={() => setStep(1)}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className='text-xl font-semibold text-slate-700'>Checkout</h1>
      </div>

      <div className='mb-6'>
        <h2 className='font-semibold mb-4'>Entregar no endereço</h2>

        <div className='space-y-3 mb-4'>
          {addresses.map((address) => (
            <div
              key={address.id}
              className='border border-gray-200 rounded-lg p-3'
            >
              <div className='flex items-center space-x-2 mb-2'>
                <input
                  type='radio'
                  id={`address-${address.id}`}
                  name='address'
                  checked={selectedAddress === address.id}
                  onChange={() => setSelectedAddress(address.id)}
                />
                <label
                  htmlFor={`address-${address.id}`}
                  className='text-sm font-medium'
                >
                  {address.street} {address.number} {address.complement}
                </label>
              </div>
              <div className='text-sm text-gray-600'>
                CEP {address.zipCode}, {address.neighborhood}/{address.city}
              </div>
            </div>
          ))}
        </div>

        <h3 className='font-medium mb-3'>Opções de entrega</h3>
        <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='retirada' id='retirada' />
              <Label htmlFor='retirada'>Retirada (até 30 min)</Label>
            </div>
            <span className='text-sm'>R$ 5,99</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='agendar' id='agendar' />
              <Label htmlFor='agendar'>Agendar</Label>
            </div>
            <span className='text-sm'>R$ 5,99</span>
          </div>
        </RadioGroup>
      </div>

      <Button
        className='w-full bg-slate-600 hover:bg-slate-700'
        onClick={() => setStep(3)}
      >
        Continuar
      </Button>
    </div>
  )

  const renderStep3 = () => (
    <div className='max-w-md mx-auto bg-white rounded-lg p-6'>
      <div className='flex items-center gap-4 mb-6'>
        <Button variant='ghost' size='sm' onClick={() => setStep(2)}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className='text-xl font-semibold text-slate-700'>Checkout</h1>
      </div>

      <div className='mb-6'>
        <h2 className='font-semibold mb-4'>Pagamento na entrega</h2>

        <div className='space-y-2 text-sm mb-4'>
          <div>Subtotal: R$ {subtotal.toFixed(2)}</div>
          <div>Taxa de Entrega: R$ {deliveryFee.toFixed(2)}</div>
          <div className='font-semibold'>Total: R$ {total.toFixed(2)}</div>
        </div>

        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='credito' id='credito' />
            <Label htmlFor='credito'>Crédito</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='debito' id='debito' />
            <Label htmlFor='debito'>Débito</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='pix' id='pix' />
            <Label htmlFor='pix'>Pix</Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        className='w-full bg-slate-600 hover:bg-slate-700'
        onClick={handleFinishOrder}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processando...' : 'Fazer Pedido'}
      </Button>
    </div>
  )

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  )
}
