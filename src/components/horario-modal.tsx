'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HorarioModalProps {
  onClose: () => void
}

export function HorarioModal({ onClose }: HorarioModalProps) {
  const horarios = [
    { dia: 'Domingo', horario: '11:00 às 15:00 - 18:00 às 22:00' },
    { dia: 'Segunda-feira', horario: '11:00 às 15:00 - 18:00 às 22:00' },
    { dia: 'Terça-feira', horario: '11:00 às 15:00 - 18:00 às 22:00' },
    { dia: 'Quarta-feira', horario: '11:00 às 15:00 - 18:00 às 22:00' },
    { dia: 'Quinta-feira', horario: '11:00 às 15:00 - 18:00 às 22:00' },
    { dia: 'Sexta-feira', horario: '11:00 às 15:00 - 18:00 às 22:00' },
    { dia: 'Sábado', horario: '11:00 às 15:00 - 18:00 às 22:00' },
  ]

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-96'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold text-slate-700'>
            Horário de Funcionamento
          </h2>
          <Button variant='ghost' size='sm' onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className='space-y-2'>
          {horarios.map((item, index) => (
            <div key={index} className='text-sm'>
              <span className='font-medium'>{item.dia}</span> {item.horario}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

