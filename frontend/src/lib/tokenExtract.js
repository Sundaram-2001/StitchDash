import {supabase} from "./supabase"
export const getToken=async()=>{
    try {
        const {data:{session},error}=await supabase.auth.getSession()
        if(error){
            console.error("Failed to fetch the session",error.message)
            return null
        }
        return session?.access_token || null
    } catch (error) {
        console.log("Failed to fetch the token, error:",error.message)
        return null
    }
}