# Lakeside Temps

A dashboard for capturing Lakeside temperature data and surfacing it via an API. Data is stored in a Redis instance.

## Routes

- `/` - the homepage dashboard
- `/upload` - the form used by staff and other trusted invdividuals to enter the temperature data. Requires a passphrase for security
- `/api/get-temps` - Returns the last recorded temps in the following schema:

```
{
  "poolTemp": 82,
  "lakeTemp": 72,
  "timestamp": "2025-06-03T23:41:40.171Z"
}
```

## Setup and build

- Clone app locally
- Run `npm install`
- Setup env variables in the env.sample file
- `npm run dev` for local development

This application was designed to use Upstash for storage and Vercel for hosting. Other providers can be used, but may require some slight retooling around the cache invalidation strategy (pay attention to what happens in `/server/api/set-temps.post.js`)

## Security

Anyone entering data in `/upload` will require a passphrase. This is set via ENV variable called `PASSPHRASE`. This should be an extremely short and memorable word.

While a really low effort at security, the idea is to make it low friction for multiple staff and trusted members to update data while still providing a hurdle for any bad actors who may accidentally discover the page.

All data is tightly validated on the backend before any processing is done. In a worse case scenario where the passphrase is compromised, a bad actor could change the temperature within a given range (currently set at 50-100).

Any application consuming the rest API should still take basic precautions against XSS attacks just in case.
