import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { create } from 'react-native/types_generated/Libraries/ReactNative/ReactFabricPublicInstance/ReactNativeAttributePayload';

const supabase_url=process.env.EXPO_PUBLIC_SUPABASE_URL
const supabase_key=process.env.EXPO_PUBLIC_SUPABASE_KEY

export const supabase=createClient(supabase_url,supabase_key,{
    auth:{
        storage:AsyncStorage,
        autoRefreshToken:true,
        persistSession:true,
        detectSessionInUrl:false
    }
})