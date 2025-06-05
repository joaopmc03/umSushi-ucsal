'use client'

import type React from 'react'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useApp } from '@/contexts/app-context'

interface ProductFormProps {
  product?: any
  onClose: () => void
}

export function ProductForm({ product, onClose }: ProductFormProps) {
  const { addProduct, updateProduct, categories } = useApp()
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    category: product?.category || 'Sushi',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (product) {
      updateProduct(product.id, formData)
    } else {
      addProduct(formData)
    }

    onClose()
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold text-slate-700'>
            {product ? 'Editar Produto' : 'Adicionar Produto'}
          </h2>
          <Button variant='ghost' size='sm' onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Label htmlFor='name'>Nome do Produto</Label>
            <Input
              id='name'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor='description'>Descrição</Label>
            <Textarea
              id='description'
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor='price'>Preço (R$)</Label>
            <Input
              id='price'
              type='number'
              step='0.01'
              min='0'
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: Number.parseFloat(e.target.value),
                })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor='category'>Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((cat) => cat !== 'Todos')
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
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
              {product ? 'Atualizar' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

