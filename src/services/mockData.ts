export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
}

export interface CartItem {
  id: number
  productId: number
  name: string
  price: number
  quantity: number
  observations?: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  cpf: string
  birthDate: string
}

export interface Address {
  id: number
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  zipCode: string
  isDefault: boolean
}

export interface Order {
  id: number
  items: CartItem[]
  total: number
  status: string
  createdAt: string
  deliveryAddress: Address
  paymentMethod: string
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Sushi Salmão',
    description:
      'Delicioso sushi de salmão fresco com arroz temperado e alga nori.',
    price: 19.99,
    category: 'Sushi',
  },
  {
    id: 2,
    name: 'Temaki Atum',
    description: 'Temaki crocante com atum fresco, pepino e cream cheese.',
    price: 15.99,
    category: 'Temaki',
  },
  {
    id: 3,
    name: 'Hot Roll Filadélfia',
    description: 'Hot roll empanado com salmão, cream cheese e cebolinha.',
    price: 24.99,
    category: 'Hot Roll',
  },
  {
    id: 4,
    name: 'Sashimi Salmão',
    description: 'Fatias frescas de salmão sem arroz, pura delícia.',
    price: 22.99,
    category: 'Sashimi',
  },
]

export const mockUser: User = {
  id: 1,
  firstName: 'João',
  lastName: 'Silva',
  email: 'joao@email.com',
  phone: '(11) 99999-9999',
  cpf: '123.456.789-00',
  birthDate: '1990-01-01',
}

export const mockAddresses: Address[] = [
  {
    id: 1,
    street: 'Avenida X',
    number: '1234',
    complement: 'Ed 2, Ap 123',
    neighborhood: 'Bairro',
    city: 'Cidade Y',
    zipCode: '12345-678',
    isDefault: true,
  },
]

export const mockOrders: Order[] = []

export const mockCategories = [
  'Todos',
  'Sushi',
  'Temaki',
  'Hot Roll',
  'Sashimi',
  'Bebidas',
  'Sobremesas',
]
