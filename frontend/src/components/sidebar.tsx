import { Home, User, Settings, LogOut, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Sidebar() {
  return (
    <div className='w-64 bg-white border-r border-gray-200 flex flex-col'>
      <div className='p-6'>
        <div className='flex items-center gap-3'>
          <Image
            src='/logo.svg'
            width={97}
            height={97}
            alt={'logo'}
            className='rounded-lg'
          />

          <div>
            <div className='font-bold text-3xl font-poppins'>UM</div>
            <div className='font-bold text-3xl font-poppins'>SUSHI</div>
          </div>
        </div>
      </div>

      <nav className='flex-1 px-4'>
        <Link
          href='/'
          className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2'
        >
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          href='/pedidos'
          className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2'
        >
          <ShoppingBag size={20} />
          <span>Meus Pedidos</span>
        </Link>
        <Link
          href='/perfil'
          className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2'
        >
          <User size={20} />
          <span>Perfil</span>
        </Link>
      </nav>

      <div className='p-4 border-t border-gray-200'>
        <Link
          href='/settings'
          className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2'
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
        <Link
          href='/login'
          className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg'
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </Link>
      </div>
    </div>
  )
}

