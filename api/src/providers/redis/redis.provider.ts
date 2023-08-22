import { Redis } from "ioredis"
import { provideSingleton } from "@expressots/core"
import ENV from "../../env"

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
