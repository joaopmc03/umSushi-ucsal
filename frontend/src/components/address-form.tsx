'use client'

import type React from 'react'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useApp } from '@/contexts/app-context'

interface AddressFormProps {
  address?: any
  onClose: () => void
}

export function AddressForm({ address, onClose }: AddressFormProps) {
  const { addAddress, updateAddress } = useApp()
  const [formData, setFormData] = useState({
    street: address?.street || '',
    number: address?.number || '',
    complement: address?.complement || '',
    neighborhood: address?.neighborhood || '',
    city: address?.city || '',
    zipCode: address?.zipCode || '',
    isDefault: address?.isDefault || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (address) {
      updateAddress(address.id, formData)
    } else {
      addAddress(formData)
    }

    onClose()
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold text-slate-700'>
            {address ? 'Editar Endereço' : 'Adicionar Endereço'}
          </h2>
          <Button variant='ghost' size='sm' onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Label htmlFor='street'>Rua/Avenida</Label>
            <Input
              id='street'
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              required
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='number'>Número</Label>
              <Input
                id='number'
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor='complement'>Complemento</Label>
              <Input
                id='complement'
                value={formData.complement}
                onChange={(e) =>
                  setFormData({ ...formData, complement: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <Label htmlFor='neighborhood'>Bairro</Label>
            <Input
              id='neighborhood'
              value={formData.neighborhood}
              onChange={(e) =>
                setFormData({ ...formData, neighborhood: e.target.value })
              }
              required
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='city'>Cidade</Label>
              <Input
                id='city'
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor='zipCode'>CEP</Label>
              <Input
                id='zipCode'
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='isDefault'
              checked={formData.isDefault}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isDefault: checked as boolean })
              }
            />
            <Label htmlFor='isDefault'>Definir como endereço padrão</Label>
          </div>

          <div className='flex gap-2 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              className='flex-1'
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              className='flex-1 bg-slate-600 hover:bg-slate-700'
            >
              {address ? 'Atualizar' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

