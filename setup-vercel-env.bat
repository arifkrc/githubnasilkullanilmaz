@echo off
echo Adding environment variables to Vercel...

vercel env add SUPABASE_URL production
echo https://larzlloluvnoyiewlwnr.supabase.co

vercel env add SUPABASE_KEY production
echo eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhcnpsbG9sdXZub3lpZXdsd25yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTkwMTMsImV4cCI6MjA3OTQ3NTAxM30.oUShqxOvMMbx6Mqo8hmF2BfKw_SLlaTjP2AIOrY7mFc

vercel env add JWT_SECRET production
echo utf_production_secret_key_2025_change_in_production

vercel env add PORT production
echo 5000

echo Done! Now redeploy your project.
pause
