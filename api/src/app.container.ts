import { AppContainer } from "@expressots/core";
import { AppModule } from "@useCases/app/app.module";
import { UsersModule } from "@useCases/users/users.module";

const appContainer = new AppContainer();

const container = appContainer.create([
  AppModule,
  UsersModule,
]);

export { container };
