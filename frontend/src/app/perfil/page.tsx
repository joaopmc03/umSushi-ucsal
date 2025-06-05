'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sidebar } from '@/components/sidebar'
import { Edit, Plus, Trash2 } from 'lucide-react'
import { useApp } from '@/contexts/app-context'
import { AddressForm } from '@/components/address-form'

export default function PerfilPage() {
  const { user, updateUser, addresses, deleteAddress } = useApp()
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<any | null>(null)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    cpf: user?.cpf || '',
    birthDate: user?.birthDate || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      cpf: formData.cpf,
      birthDate: formData.birthDate,
    })
    alert('Perfil atualizado com sucesso!')
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      alert('As senhas não coincidem!')
      return
    }
    alert('Senha atualizada com sucesso!')
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }

  const handleDeleteAddress = (addressId: number) => {
    if (confirm('Tem certeza que deseja excluir este endereço?')) {
      deleteAddress(addressId)
    }
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />

      <div className='flex-1 p-6'>
        <h1 className='text-2xl font-semibold text-slate-700 mb-6'>Perfil</h1>

        <Tabs defaultValue='dados' className='w-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='dados'>Alterar dados cadastrais</TabsTrigger>
            <TabsTrigger value='senha'>Alterar Senha</TabsTrigger>
            <TabsTrigger value='enderecos'>Meus endereços</TabsTrigger>
          </TabsList>

          <TabsContent value='dados' className='space-y-6'>
            <div className='bg-white rounded-lg p-6'>
              <form onSubmit={handleUpdateProfile}>
                <div className='grid grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <div>
                      <Label htmlFor='firstName'>Nome</Label>
                      <Input
                        id='firstName'
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor='lastName'>Sobrenome</Label>
                      <Input
                        id='lastName'
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div>
                      <Label htmlFor='phone'>Telefone</Label>
                      <Input
                        id='phone'
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor='cpf'>CPF</Label>
                      <Input
                        id='cpf'
                        value={formData.cpf}
                        onChange={(e) =>
                          setFormData({ ...formData, cpf: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor='birthDate'>Data de Nascimento</Label>
                      <Input
                        id='birthDate'
                        type='date'
                        value={formData.birthDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            birthDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className='flex gap-4 mt-6'>
                  <Button
                    type='submit'
                    className='bg-slate-600 hover:bg-slate-700'
                  >
                    Salvar Alterações
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>

          <TabsContent value='senha' className='space-y-6'>
            <div className='bg-white rounded-lg p-6'>
              <form onSubmit={handleUpdatePassword}>
                <div className='max-w-md space-y-4'>
                  <div>
                    <Label htmlFor='currentPassword'>Senha Atual</Label>
                    <Input
                      id='currentPassword'
                      type='password'
                      value={formData.currentPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentPassword: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor='newPassword'>Nova Senha</Label>
                    <Input
                      id='newPassword'
                      type='password'
                      value={formData.newPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          newPassword: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor='confirmPassword'>
                      Confirmar Nova Senha
                    </Label>
                    <Input
                      id='confirmPassword'
                      type='password'
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>

                  <p className='text-xs text-gray-500'>
                    A senha deve conter pelo menos 8 caracteres, pelo menos uma
                    letra maiúscula e um caractere especial
                  </p>

                  <Button
                    type='submit'
                    className='bg-slate-600 hover:bg-slate-700'
                  >
                    Alterar Senha
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>

          <TabsContent value='enderecos' className='space-y-4'>
            <div className='bg-white rounded-lg p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold'>Meus Endereços</h3>
                <Button
                  onClick={() => {
                    setEditingAddress(null)
                    setShowAddressForm(true)
                  }}
                  className='bg-slate-600 hover:bg-slate-700'
                >
                  <Plus size={16} className='mr-2' />
                  Adicionar Endereço
                </Button>
              </div>

              <div className='space-y-4'>
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'
                  >
                    <div>
                      <div className='font-medium'>
                        {address.street} {address.number} {address.complement}
                        {address.isDefault && (
                          <span className='ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded'>
                            Padrão
                          </span>
                        )}
                      </div>
                      <div className='text-sm text-gray-600'>
                        CEP {address.zipCode}, {address.neighborhood}/
                        {address.city}
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => {
                          setEditingAddress(address)
                          setShowAddressForm(true)
                        }}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleDeleteAddress(address.id)}
                        className='text-red-600 hover:text-red-700'
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {showAddressForm && (
          <AddressForm
            address={editingAddress}
            onClose={() => {
              setShowAddressForm(false)
              setEditingAddress(null)
            }}
          />
        )}
      </div>
    </div>
  )
}

