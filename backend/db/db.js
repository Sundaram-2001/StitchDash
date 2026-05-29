import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"

dotenv.config()

const supabaseUrl=process.env.SUPABASE_URL
const supabaseServiceKey=process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
    "Missing critical Supabase environment variables! Check your hidden .env file setup."
    );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
    persistSession: false, 
    autoRefreshToken: false 
    }
});