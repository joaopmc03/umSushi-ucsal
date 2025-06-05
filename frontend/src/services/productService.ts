import { Product, mockProducts } from './mockData'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

class ProductService {
  private products: Product[] = [...mockProducts]

  async getProducts(): Promise<Product[]> {
    await delay(300)
    return [...this.products]
  }

  async getProductById(id: number): Promise<Product | null> {
    await delay(200)
    return this.products.find((p) => p.id === id) || null
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    await delay(500)
    const newProduct = { ...product, id: Date.now() }
    this.products.push(newProduct)
    return newProduct
  }

  async updateProduct(
    id: number,
    updates: Partial<Product>
  ): Promise<Product | null> {
    await delay(400)
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return null

    this.products[index] = { ...this.products[index], ...updates }
    return this.products[index]
  }

  async deleteProduct(id: number): Promise<boolean> {
    await delay(300)
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return false

    this.products.splice(index, 1)
    return true
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    await delay(250)
    if (category === 'Todos') return [...this.products]
    return this.products.filter((p) => p.category === category)
  }
}

export const productService = new ProductService()
