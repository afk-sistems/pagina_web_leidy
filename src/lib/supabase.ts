import { createClient } from '@supabase/supabase-js'



export const supabase = createClient('https://lxdtjqzumbthhupmaktm.supabase.co', 'sb_publishable_Ua27a2eaoFvxGZII-N6ZpQ_b71bDbnq', {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    }
});

