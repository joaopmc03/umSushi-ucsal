'use client'

import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useApp } from '@/contexts/app-context'

export function CategoryTabs() {
  const { categories, selectedCategory, setSelectedCategory } = useApp()

  return (
    <div className='bg-white border border-gray-200 rounded-lg p-4 mb-6'>
      <div className='flex items-center gap-2'>
        <Button variant='outline' size='sm' className='flex items-center gap-2'>
          <Menu size={16} />
        </Button>
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size='sm'
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category ? 'bg-slate-600 text-white' : ''
            }
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  )
}

