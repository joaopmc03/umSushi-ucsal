export type {
  Product,
  CartItem,
  User,
  Address,
  Order,
} from '../services/mockData'

export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface LoadingState {
  loading: boolean
  error: string | null
}
