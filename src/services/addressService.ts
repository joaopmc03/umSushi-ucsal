import { Address, mockAddresses } from './mockData'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

class AddressService {
  private addresses: Address[] = [...mockAddresses]

  async getAddresses(): Promise<Address[]> {
    await delay(250)
    return [...this.addresses]
  }

  async getAddressById(id: number): Promise<Address | null> {
    await delay(200)
    return this.addresses.find((addr) => addr.id === id) || null
  }

  async createAddress(address: Omit<Address, 'id'>): Promise<Address> {
    await delay(500)
    const newAddress = { ...address, id: Date.now() }
    this.addresses.push(newAddress)
    return newAddress
  }

  async updateAddress(
    id: number,
    updates: Partial<Address>
  ): Promise<Address | null> {
    await delay(400)
    const index = this.addresses.findIndex((addr) => addr.id === id)
    if (index === -1) return null

    this.addresses[index] = { ...this.addresses[index], ...updates }
    return this.addresses[index]
  }

  async deleteAddress(id: number): Promise<boolean> {
    await delay(300)
    const index = this.addresses.findIndex((addr) => addr.id === id)
    if (index === -1) return false

    this.addresses.splice(index, 1)
    return true
  }

  async getDefaultAddress(): Promise<Address | null> {
    await delay(200)
    return this.addresses.find((addr) => addr.isDefault) || null
  }
}

export const addressService = new AddressService()
