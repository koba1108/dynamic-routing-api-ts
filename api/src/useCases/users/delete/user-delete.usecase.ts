import { Report, StatusCode } from "@expressots/core"
import { UserRepository } from "@repositories/user/user.repository"
import { provide } from "inversify-binding-decorators"

@provide(UserDeleteUseCase)
class UserDeleteUseCase {
  constructor(private userRepository: UserRepository) {
  }

  async execute(id: number): Promise<void> {
    const exists = await this.userRepository.existsById(id)
    if (!exists) {
      Report.Error(
        "User not found",
        StatusCode.BadRequest,
        "user-delete-usecase",
      )
    }
    await this.userRepository.delete(id)
  }
}

export { UserDeleteUseCase }
