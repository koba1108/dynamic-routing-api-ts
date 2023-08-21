import { Report, StatusCode } from "@expressots/core";
import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";
import {
  IUserUpdateRequestDTO,
  IUserUpdateResponseDTO,
} from "./user-update.dto";

@provide(UserUpdateUseCase)
class UserUpdateUseCase {
  constructor(private userRepository: UserRepository) {
  }

  async execute(payload: IUserUpdateRequestDTO): Promise<IUserUpdateResponseDTO | null> {
    const _user = await this.userRepository.findById(payload.id);
    if (!_user) {
      Report.Error(
        "User not found",
        StatusCode.BadRequest,
        "user-update-usecase",
      );
      return null;
    }
    if (payload.name) {
      _user.name = payload.name;
    }
    if (payload.email) {
      _user.email = payload.email;
    }
    const user = await this.userRepository.update(payload.id, _user);
    return { user };
  }
}

export { UserUpdateUseCase };
