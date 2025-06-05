'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sidebar } from '@/components/sidebar'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  const renderLogin = () => (
    <div className='max-w-md mx-auto'>
      <h1 className='text-2xl font-semibold text-slate-700 mb-6'>
        Entre em sua conta
      </h1>

      <div className='space-y-4'>
        <div>
          <Label htmlFor='email'>Email*</Label>
          <Input id='email' type='email' placeholder='Email' />
        </div>

        <div>
          <Label htmlFor='password'>Senha*</Label>
          <Input id='password' type='password' placeholder='Senha' />
        </div>

        <Button className='w-full bg-slate-600 hover:bg-slate-700'>
          Criar Conta
        </Button>

        <div className='text-center'>
          <button
            onClick={() => setIsLogin(false)}
            className='text-sm text-blue-600 hover:underline'
          >
            Esqueceu a senha?
          </button>
        </div>
      </div>
    </div>
  )

  const renderRegister = () => (
    <div className='max-w-md mx-auto'>
      <h1 className='text-2xl font-semibold text-slate-700 mb-6'>
        Crie uma Conta
      </h1>

      <div className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='firstName'>Primeiro Nome*</Label>
            <Input id='firstName' placeholder='Primeiro Nome' />
          </div>
          <div>
            <Label htmlFor='lastName'>Sobrenome*</Label>
            <Input id='lastName' placeholder='Primeiro Nome' />
          </div>
        </div>

        <div>
          <Label htmlFor='email'>Email*</Label>
          <Input id='email' type='email' placeholder='Email' />
        </div>

        <div>
          <Label htmlFor='password'>Senha*</Label>
          <Input id='password' type='password' placeholder='Senha' />
          <p className='text-xs text-gray-500 mt-1'>
            A senha deve conter pelo menos 8 caracteres, pelo menos uma letra
            maiúscula e um caractere especial
          </p>
        </div>

        <div>
          <Label htmlFor='confirmPassword'>Confirme a Senha*</Label>
          <Input
            id='confirmPassword'
            type='password'
            placeholder='Confirme a Senha'
          />
        </div>

        <div>
          <Label htmlFor='phone'>Telefone*</Label>
          <Input id='phone' placeholder='Telefone' />
        </div>

        <Button className='w-full bg-slate-600 hover:bg-slate-700'>
          Criar Conta
        </Button>
      </div>
    </div>
  )

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />

      <div className='flex-1 flex items-center justify-center p-6'>
        {isLogin ? renderLogin() : renderRegister()}
      </div>
    </div>
  )
}

