import { User } from "@entities/user.entity"
import { Report, StatusCode } from "@expressots/core"
import { UserRepository } from "@repositories/user/user.repository"
import { provide } from "inversify-binding-decorators"
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from "./user-create.dto"

@provide(CreateUserUseCase)
class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {
  }

  async execute(payload: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO | null> {
    const exist = await this.userRepository.existsByEmail(payload.email)
    if (exist) {
      Report.Error(
        "User already exists",
        StatusCode.BadRequest,
        "create-user-usecase",
      )
      return null
    }
    const data = new User(payload.name, payload.email)
    const user = await this.userRepository.create(data)
    return { user }
  }
}

export { CreateUserUseCase }
