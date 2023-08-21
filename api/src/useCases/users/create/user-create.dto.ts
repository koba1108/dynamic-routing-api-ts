import { User } from "@entities/user.entity";

interface ICreateUserRequestDTO {
  name: string;
  email: string;
}

interface ICreateUserResponseDTO {
  user: User
}

export { ICreateUserRequestDTO, ICreateUserResponseDTO };
