import { AppContainer } from "@expressots/core"
import { AppModule } from "@useCases/app/app.module"
import { UsersModule } from "@useCases/users/users.module"
import { ContentTypesModule } from "@useCases/content-types/content-types.module"
import { ContentFieldsModule } from "@useCases/content-fields/content-fields.module"

const appContainer = new AppContainer()

const container = appContainer.create([
  AppModule,
  UsersModule,
  ContentTypesModule,
  ContentFieldsModule,
])

export { container }
