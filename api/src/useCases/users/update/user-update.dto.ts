import { User } from "@entities/user.entity";

interface IUserUpdateRequestDTO {
  id: number;
  name?: string;
  email: string;
}

interface IUserUpdateResponseDTO {
  user: User;
}

export { IUserUpdateRequestDTO, IUserUpdateResponseDTO };
