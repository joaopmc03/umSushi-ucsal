'use client'

import { MapPin, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onHorarioClick: () => void
}

export function Header({ onHorarioClick }: HeaderProps) {
  return (
    <div className='mb-6'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <MapPin size={20} className='text-gray-600' />
          <span className='text-gray-700'>Avenida X 1234</span>
          <ChevronDown size={16} className='text-gray-600' />
        </div>
      </div>

      <div className='bg-white border border-gray-200 rounded-lg p-6 mb-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='font-semibold text-lg mb-2'>
              Rua do Espírito Santo, 08
            </h2>
            <p className='text-gray-600 mb-1'>
              Fechado no momento - Agendamento disponível
            </p>
            <p className='text-gray-500 text-sm'>Somente Delivery</p>
          </div>
          <Button
            onClick={onHorarioClick}
            className='bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg'
          >
            Horário de Funcionamento
          </Button>
        </div>
      </div>
    </div>
  )
}

