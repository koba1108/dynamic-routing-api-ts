import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpGet, response } from "inversify-express-utils";
import { Response } from "express";
import { IFindAllUserResponseDTO } from "./user-findall.dto";
import { FindAllUserUseCase } from "./user-findall.usecase";

@controller("/users")
class UserFindallController extends BaseController {
  constructor(private findallUserUseCase: FindAllUserUseCase) {
    super("findall-user-controller");
  }

  @httpGet("/")
  async execute(@response() res: Response): Promise<IFindAllUserResponseDTO> {
    return this.callUseCase(
      await this.findallUserUseCase.execute(),
      res,
      StatusCode.OK,
    );
  }
}

export { UserFindallController };
