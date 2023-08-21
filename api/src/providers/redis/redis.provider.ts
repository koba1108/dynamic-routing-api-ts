import { Redis } from "ioredis"
import ENV from "../../env"
import { provideSingleton } from "@expressots/core"

@provideSingleton(RedisProvider)
class RedisProvider {
  protected readonly redis = new Redis({
    host: ENV.Redis.REDIS_HOST,
    port: ENV.Redis.REDIS_PORT,
  })

  client() {
    return this.redis
  }
}

export { RedisProvider }
