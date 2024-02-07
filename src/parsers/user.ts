import { UserModel } from '@/src/types/User'

const userParsers = (data: any): UserModel[] => {
  const user = data.map((user: any) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    }
  })
  return user
}

export default userParsers
