const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://larzlloluvnoyiewlwnr.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhcnpsbG9sdXZub3lpZXdsd25yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTkwMTMsImV4cCI6MjA3OTQ3NTAxM30.oUShqxOvMMbx6Mqo8hmF2BfKw_SLlaTjP2AIOrY7mFc';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
