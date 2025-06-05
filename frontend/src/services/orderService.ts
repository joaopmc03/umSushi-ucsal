import { Order, mockOrders } from './mockData'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

class OrderService {
  private orders: Order[] = [...mockOrders]

  async getOrders(): Promise<Order[]> {
    await delay(300)
    return [...this.orders]
  }

  async getOrderById(id: number): Promise<Order | null> {
    await delay(200)
    return this.orders.find((order) => order.id === id) || null
  }

  async createOrder(
    orderData: Omit<Order, 'id' | 'createdAt'>
  ): Promise<Order> {
    await delay(600)
    const newOrder: Order = {
      ...orderData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }
    this.orders.push(newOrder)
    return newOrder
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | null> {
    await delay(400)
    const index = this.orders.findIndex((order) => order.id === id)
    if (index === -1) return null

    this.orders[index] = { ...this.orders[index], status }
    return this.orders[index]
  }

  async getOrdersByStatus(status: string): Promise<Order[]> {
    await delay(250)
    return this.orders.filter((order) => order.status === status)
  }
}

export const orderService = new OrderService()
