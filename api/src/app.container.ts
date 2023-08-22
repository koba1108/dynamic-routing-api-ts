import { AppContainer } from "@expressots/core"
import { AppModule } from "@useCases/app/app.module"
import { ContentTypesModule } from "@useCases/content-types/content-types.module"
import { ContentFieldsModule } from "@useCases/content-fields/content-fields.module"
import { ContentValuesModule } from "@useCases/content-values/content-values.module"
import { ContentsModule } from "@useCases/contents/contents.module"
import { UsersModule } from "@useCases/users/users.module"
import { UserContentsModule } from "@useCases/user-contents/user-contents.module"

const appContainer = new AppContainer()

const container = appContainer.create([
  AppModule,
  ContentTypesModule,
  ContentFieldsModule,
  ContentValuesModule,
  ContentsModule,
  UsersModule,
  UserContentsModule,
])

export { container }
