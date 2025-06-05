import { User, mockUser } from './mockData'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

class UserService {
  private user: User | null = { ...mockUser }

  async getUser(): Promise<User | null> {
    await delay(200)
    return this.user ? { ...this.user } : null
  }

  async updateUser(updates: Partial<User>): Promise<User | null> {
    await delay(400)
    if (!this.user) return null

    this.user = { ...this.user, ...updates }
    return { ...this.user }
  }

  async loginUser(email: string, password: string): Promise<User | null> {
    await delay(600)
    if (email && password) {
      this.user = { ...mockUser }
      return { ...this.user }
    }
    return null
  }

  async logoutUser(): Promise<void> {
    await delay(200)
    this.user = null
  }
}

export const userService = new UserService()
