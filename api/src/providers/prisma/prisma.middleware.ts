import { createPrismaRedisCache } from "prisma-redis-middleware"
import { Redis } from "ioredis"
import { Prisma } from "@prisma/client"

export function redisCacheMiddleware(redis: Redis): Prisma.Middleware {
  return createPrismaRedisCache({
    cacheTime: 300,
    storage: {
      type: "redis",
      options: {
        client: redis,
        invalidation: { referencesTTL: 300 },
        // log: console,
      },
    },
    onHit: (key) => {
      console.log("redis:hit", key)
    },
    onMiss: (key) => {
      console.log("redis:miss", key)
    },
    onError: (key) => {
      console.log("redis:error", key)
    },
  })
}
