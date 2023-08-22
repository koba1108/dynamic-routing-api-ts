import { UserRepository } from "@repositories/user/user.repository"
import { provide } from "inversify-binding-decorators"
import { Report, StatusCode } from "@expressots/core"
import { IUserFindRequestDTO, IUserFindResponseDTO } from "./user-find.dto"

@provide(UserFindUseCase)
class UserFindUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    payload: IUserFindRequestDTO,
  ): Promise<IUserFindResponseDTO | null> {
    const user = await this.userRepository.findById(payload.id)
    if (!user) {
      Report.Error("User not found", StatusCode.BadRequest, "user-find-usecase")
      return null
    }
    return {
      user,
    }
  }
}

export { UserFindUseCase }
