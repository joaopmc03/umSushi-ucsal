import { useState, useEffect } from 'react'
import { Product } from '../services/mockData'
import { productService } from '../services/productService'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getProducts()
      setProducts(data)
    } catch (err) {
      setError('Erro ao carregar produtos')
      console.error('Error loading products:', err)
    } finally {
      setLoading(false)
    }
  }

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      setError(null)
      const newProduct = await productService.createProduct(product)
      setProducts((prev) => [...prev, newProduct])
      return newProduct
    } catch (err) {
      setError('Erro ao adicionar produto')
      console.error('Error adding product:', err)
      throw err
    }
  }

  const updateProduct = async (id: number, updates: Partial<Product>) => {
    try {
      setError(null)
      const updatedProduct = await productService.updateProduct(id, updates)
      if (updatedProduct) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? updatedProduct : p))
        )
      }
      return updatedProduct
    } catch (err) {
      setError('Erro ao atualizar produto')
      console.error('Error updating product:', err)
      throw err
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      setError(null)
      const success = await productService.deleteProduct(id)
      if (success) {
        setProducts((prev) => prev.filter((p) => p.id !== id))
      }
      return success
    } catch (err) {
      setError('Erro ao deletar produto')
      console.error('Error deleting product:', err)
      throw err
    }
  }

  const getProductsByCategory = async (category: string) => {
    try {
      setError(null)
      const data = await productService.getProductsByCategory(category)
      return data
    } catch (err) {
      setError('Erro ao filtrar produtos por categoria')
      console.error('Error filtering products:', err)
      throw err
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return {
    products,
    loading,
    error,
    loadProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
  }
}
