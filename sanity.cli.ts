import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '10jnk8h0',
    dataset: 'production'
  },
  project: {
    basePath: '/studio'
  },
  // Server config is ONLY for local development (npm run sanity)
  // Production URL is configured via deployment.appId (Netlify)
  server: {
    port: 3333,
    hostname: 'localhost' // Only used when running locally
  },
  deployment: {
    appId: 'romxwzcx3einoed9daujkon3',
    autoUpdates: true
    // Production URL: https://pmpkedu.netlify.app/studio
  }
})
