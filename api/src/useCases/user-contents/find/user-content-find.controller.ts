import { BaseController, StatusCode } from "@expressots/core"
import {
  controller,
  httpGet,
  requestParam,
  response,
} from "inversify-express-utils"
import { Response } from "express"
import { IUserContentFindResponseDTO } from "./user-content-find.dto"
import { UserContentFindUsecase } from "./user-content-find.usecase"

@controller("/users/:userId/:contentTypeName")
class UserContentFindController extends BaseController {
  constructor(private usecase: UserContentFindUsecase) {
    super("user-content-find-controller")
  }

  @httpGet("/:id")
  async execute(
    @requestParam("userId") userId: string,
    @requestParam("contentTypeName") contentTypeName: string,
    @requestParam("id") id: string,
    @response() res: Response,
  ): Promise<IUserContentFindResponseDTO> {
    return this.callUseCaseAsync(
      this.usecase.execute({
        id: Number(id),
        userId: Number(userId),
        contentTypeName,
      }),
      res,
      StatusCode.OK,
    )
  }
}

export { UserContentFindController }
