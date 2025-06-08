import { useRuntimeConfig } from '#imports';
import { z } from 'zod/v4';
import { Redis } from '@upstash/redis';

// Pull connection string secrets
const runtimeConfig = useRuntimeConfig();
const { passPhrase, redisURL, redisToken, vercelBypassToken } = runtimeConfig;

// Define the expected payload schema for our POST request
const payloadSchema = z.object({
  poolTemp: z.number().gte(50).lte(100),
  lakeTemp: z.number().gte(50).lte(100),
  passPhrase: z.literal(passPhrase),
});

// Connect to redis server
const redis = new Redis({
  url: redisURL,
  token: redisToken,
});

export default defineEventHandler(async (event) => {
  // Validate the POST body payload
  const payload = await readValidatedBody(event, (body) => payloadSchema.safeParse(body));

  // Payload didn't validate, give a generic error
  if (!payload.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid payload',
    });
  }

  // Store temperatures in KV database
  const { poolTemp, lakeTemp, passPhrase } = payload.data;
  try {
    await redis.set('temperatures', {
      poolTemp,
      lakeTemp,
      timestamp: new Date(),
    });
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Unable to save data',
    });
  }

  // VERCEL SPECIFIC: bust the cache on our ISR routes
  const headers = {
    'x-prerender-revalidate': vercelBypassToken,
  };
  await fetch('https://lakeside-temps.vercel.app/', { headers });
  await fetch('https://lakeside-temps.vercel.app/api/get-temps', { headers });

  return { msg: 'ok' };
});
