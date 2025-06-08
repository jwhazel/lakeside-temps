// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],
  app: {
    head: {
      title: 'Lakeside Swim Club Temperatures',
      meta: [{ name: 'robots', content: 'noindex' }],
    },
  },
  routeRules: {
    '/': { isr: 86400 },
    '/upload': { prerender: true },
    '/api/get-temps': { isr: 86400, cors: true },
  },
  runtimeConfig: {
    passPhrase: process.env.PASSPHRASE,
    redisURL: process.env.REDIS_URL,
    redisToken: process.env.REDIS_TOKEN,
  },
  nitro: {
    vercel: {
      config: {
        bypassToken: process.env.VERCEL_BYPASS_TOKEN,
      },
    },
  },
});
