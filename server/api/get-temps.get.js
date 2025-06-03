import { useRuntimeConfig } from "#imports";
import { z } from "zod/v4";
import { Redis } from "@upstash/redis";

// Pull connection string secrets
const runtimeConfig = useRuntimeConfig();
const { redisURL, redisToken } = runtimeConfig;

// Define the expected payload schema for our response
const responseSchema = z.object({
  poolTemp: z.number().gte(50).lte(100),
  lakeTemp: z.number().gte(50).lte(100),
  timestamp: z.iso.datetime(),
});

// Instantiate new Redis client
const redis = new Redis({
  url: redisURL,
  token: redisToken,
});

export default defineEventHandler(async () => {
  const data = await redis.get("temperatures");
  const response = responseSchema.safeParse(data);

  // Response didn't validate, give a generic error
  if (!response.success) {
    throw createError({
      statusCode: 422,
      statusMessage: "Invalid data source",
    });
  }

  return response.data;
});
