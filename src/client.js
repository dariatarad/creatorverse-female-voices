import { createClient } from '@supabase/supabase-js'

const URL = 'https://cyiclziaoivdvoanvfdz.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5aWNsemlhb2l2ZHZvYW52ZmR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDUyMzksImV4cCI6MjA5NDM4MTIzOX0.pKQe8dkAKsiIoyDlcB3Y7sgG0bkU0LFIyVeZmKnCei4'

export const supabase = createClient(URL, API_KEY)