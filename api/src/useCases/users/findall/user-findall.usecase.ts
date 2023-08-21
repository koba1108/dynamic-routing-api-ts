import { provide } from "inversify-binding-decorators"
import { User } from "@entities/user.entity"
import { UserRepository } from "@repositories/user/user.repository"
import { IFindAllUserResponseDTO } from "./user-findall.dto"

@provide(FindAllUserUseCase)
class FindAllUserUseCase {
  constructor(private userRepository: UserRepository) {
  }

  async execute(): Promise<IFindAllUserResponseDTO> {
    try {
      const [users, total] = await Promise.all([
        this.userRepository.findAll(),
        this.userRepository.countAll(),
      ])
      return { users, total }
    } catch (error: any) {
      throw error
    }
  }
}

export { FindAllUserUseCase }
