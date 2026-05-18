import { createClient } from '@supabase/supabase-js'

const URL = 'https://cyiclziaoivdvoanvfdz.supabase.co'
const API_KEY = 'sb_publishable_h6OcsP1sBq8lKDMtW1cxuQ_PF_R4dUJ'

export const supabase = createClient(URL, API_KEY)