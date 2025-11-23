# Vercel Deployment

Deploy backend only to Vercel.

## Environment Variables

Add these in Vercel dashboard:

```
SUPABASE_URL=https://larzlloluvnoyiewlwnr.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhcnpsbG9sdXZub3lpZXdsd25yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTkwMTMsImV4cCI6MjA3OTQ3NTAxM30.oUShqxOvMMbx6Mqo8hmF2BfKw_SLlaTjP2AIOrY7mFc
JWT_SECRET=utf_production_secret_key_2025_change_in_production
PORT=5000
```

## Deploy Commands

```bash
vercel --prod
```

Your API will be available at: https://your-project.vercel.app/api
