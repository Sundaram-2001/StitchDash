import { createClient } from '@supabase/supabase-js'
import 'expo-sqlite/localStorage/install';
import { create } from 'react-native/types_generated/Libraries/ReactNative/ReactFabricPublicInstance/ReactNativeAttributePayload';

const supabase_url=process.env.EXPO_PUBLIC_SUPABASE_URL
const supabase_key=process.env.EXPO_PUBLIC_SUPABASE_KEY

export const supabase=createClient(supabase_url,supabase_key,{
    auth:{
        storage:localStorage,
        autoRefreshToken:true,
        persistSession:true,
        detectSessionInUrl:false
    }
})