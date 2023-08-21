import { User } from "@entities/user.entity";

interface IUserFindRequestDTO {
  id: number;
}

interface IUserFindResponseDTO {
  user: User;
}

export { IUserFindRequestDTO, IUserFindResponseDTO };
