import { provide } from "inversify-binding-decorators";

@provide(AppUseCase)
class AppUseCase {
  execute(): string {
    return "Health Check is OK!";
  }
}

export { AppUseCase };
