'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

import {
  Product,
  CartItem,
  User,
  Address,
  Order,
  mockCategories,
} from '../services/mockData'
import { productService } from '../services/productService'
import { userService } from '../services/userService'
import { addressService } from '../services/addressService'
import { orderService } from '../services/orderService'

interface AppContextType {
  products: Product[]
  loadingProducts: boolean
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: number) => Promise<void>

  cartItems: CartItem[]
  addToCart: (product: Product, quantity: number, observations?: string) => void
  removeFromCart: (id: number) => void
  updateCartItem: (id: number, quantity: number) => void
  clearCart: () => void

  user: User | null
  loadingUser: boolean
  updateUser: (userData: Partial<User>) => Promise<void>

  addresses: Address[]
  loadingAddresses: boolean
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>
  updateAddress: (id: number, address: Partial<Address>) => Promise<void>
  deleteAddress: (id: number) => Promise<void>

  orders: Order[]
  loadingOrders: boolean
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Promise<void>

  categories: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const [user, setUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  const [addresses, setAddresses] = useState<Address[]>([])
  const [loadingAddresses, setLoadingAddresses] = useState(true)

  const [orders, setOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const categories = mockCategories

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoadingProducts(true)
        const productsData = await productService.getProducts()
        setProducts(productsData)

        setLoadingUser(true)
        const userData = await userService.getUser()
        setUser(userData)

        setLoadingAddresses(true)
        const addressesData = await addressService.getAddresses()
        setAddresses(addressesData)

        setLoadingOrders(true)
        const ordersData = await orderService.getOrders()
        setOrders(ordersData)
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error)
      } finally {
        setLoadingProducts(false)
        setLoadingUser(false)
        setLoadingAddresses(false)
        setLoadingOrders(false)
      }
    }

    loadInitialData()
  }, [])

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const newProduct = await productService.createProduct(product)
      setProducts((prev) => [...prev, newProduct])
    } catch (error) {
      console.error('Erro ao adicionar produto:', error)
      throw error
    }
  }

  const updateProduct = async (id: number, productData: Partial<Product>) => {
    try {
      const updatedProduct = await productService.updateProduct(id, productData)
      if (updatedProduct) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? updatedProduct : p))
        )
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error)
      throw error
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      const success = await productService.deleteProduct(id)
      if (success) {
        setProducts((prev) => prev.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error('Erro ao deletar produto:', error)
      throw error
    }
  }

  const addToCart = (
    product: Product,
    quantity: number,
    observations?: string
  ) => {
    const existingItem = cartItems.find((item) => item.productId === product.id)

    if (existingItem) {
      updateCartItem(existingItem.id, existingItem.quantity + quantity)
    } else {
      const newItem: CartItem = {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        observations,
      }
      setCartItems((prev) => [...prev, newItem])
    }
  }

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateCartItem = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const updateUser = async (userData: Partial<User>) => {
    try {
      const updatedUser = await userService.updateUser(userData)
      setUser(updatedUser)
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
      throw error
    }
  }

  const addAddress = async (address: Omit<Address, 'id'>) => {
    try {
      const newAddress = await addressService.createAddress(address)
      setAddresses((prev) => [...prev, newAddress])
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error)
      throw error
    }
  }

  const updateAddress = async (id: number, addressData: Partial<Address>) => {
    try {
      const updatedAddress = await addressService.updateAddress(id, addressData)
      if (updatedAddress) {
        setAddresses((prev) =>
          prev.map((addr) => (addr.id === id ? updatedAddress : addr))
        )
      }
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error)
      throw error
    }
  }

  const deleteAddress = async (id: number) => {
    try {
      const success = await addressService.deleteAddress(id)
      if (success) {
        setAddresses((prev) => prev.filter((addr) => addr.id !== id))
      }
    } catch (error) {
      console.error('Erro ao deletar endereço:', error)
      throw error
    }
  }

  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    try {
      const newOrder = await orderService.createOrder(orderData)
      setOrders((prev) => [...prev, newOrder])
      clearCart()
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
      throw error
    }
  }

  const value: AppContextType = {
    products:
      selectedCategory === 'Todos'
        ? products
        : products.filter((p) => p.category === selectedCategory),
    loadingProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    user,
    loadingUser,
    updateUser,
    addresses,
    loadingAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    orders,
    loadingOrders,
    createOrder,
    categories,
    selectedCategory,
    setSelectedCategory,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
