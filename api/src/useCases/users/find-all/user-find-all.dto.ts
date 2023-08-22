import { User } from "@entities/user.entity"

interface IFindAllUserResponseDTO {
  total: number
  users: User[]
}

export { IFindAllUserResponseDTO }
