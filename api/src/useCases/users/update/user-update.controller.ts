import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPut,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils"
import { Response } from "express";
import {
  IUserUpdateRequestDTO,
  IUserUpdateResponseDTO,
} from "./user-update.dto";
import { UserUpdateUseCase } from "./user-update.usecase";

@controller("/users")
class UserUpdateController extends BaseController {
  constructor(private userUpdateUseCase: UserUpdateUseCase) {
    super("user-update-controller");
  }

  @httpPut("/:id")
  async execute(
    @requestParam("id") id: string,
    @requestBody() payload: IUserUpdateRequestDTO,
    @response() res: Response,
  ): Promise<IUserUpdateResponseDTO> {
    return this.callUseCase(
      await this.userUpdateUseCase.execute({ ...payload, id: Number(id) }),
      res,
      StatusCode.OK,
    );
  }
}

export { UserUpdateController };
