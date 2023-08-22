import "reflect-metadata"

import { ServerEnvironment } from "@expressots/core"
import { App } from "@providers/application/application.provider"
import { container } from "app.container"
import ENV from "./env"
import { corsMiddleware } from "./middlewares/cors/cors.middleware"

async function bootstrap() {
  const app = App.create(container, [corsMiddleware])
  return app.listen(
    ENV.Application.PORT,
    ServerEnvironment[ENV.Application.ENVIRONMENT],
    {
      appName: ENV.Application.APP_NAME,
      appVersion: ENV.Application.APP_VERSION,
    },
  )
}

bootstrap().finally(() => {
  const url = `${ENV.Application.DOMAIN}:${ENV.Application.PORT}`
  console.log("Application started: " + url)
})
