import { BaseController, StatusCode } from "@expressots/core"
import {
  controller,
  httpGet,
  requestParam,
  response,
} from "inversify-express-utils"
import { Response } from "express"
import { IUserFindResponseDTO } from "./user-find.dto"
import { UserFindUseCase } from "./user-find.usecase"

@controller("/users")
class UserFindController extends BaseController {
  constructor(private usecase: UserFindUseCase) {
    super("user-find-controller")
  }

  @httpGet("/:id")
  async execute(
    @requestParam("id") id: string,
    @response() res: Response,
  ): Promise<IUserFindResponseDTO> {
    return this.callUseCaseAsync(
      this.usecase.execute({ id: Number(id) }),
      res,
      StatusCode.OK,
    )
  }
}

export { UserFindController }
