// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],
  runtimeConfig: {
    passPhrase: process.env.PASSPHRASE,
    redisURL: process.env.REDIS_URL,
    redisToken: process.env.REDIS_TOKEN,
  },
});
