import { router, Stack } from "expo-router"
import {supabase} from "../lib/supabase"
import { Alert } from "react-native"
import { useEffect } from "react"


export default function RootLayout(){
  useEffect(()=>{
    const checkProfileAndSession=async (session)=>{
      //session does not exist
      if(!session){
        router.replace("/login")
        return 
      }
      //session exists, checking if profile exists
      try {
        const {data:profile, error:profileError}=await supabase
        .from("users")
        .select("account_type")
        .eq("user_id",session.user.id)
        .single()
        //profile not found
        if(!profile || profileError){
          router.replace("/onboarding")
          return
        }
        //profile found, but is registered as a tailor
        if(profile.account_type!=="customer"){
          Alert.alert("Access Denied, this account is registered as Tailor. Kindly use a new email!")
          await supabase.auth.signOut()
          router.replace("/")
          return
        }
        //sesssion and proile exsits
        router.replace("/dashboard")
      } catch (error) {
        console.error("Unexpected failure:",error)
        router.replace("/")
      }
    }

    //on app starting
    supabase.auth.getSession().then(({data:{session}})=>{
      checkProfileAndSession(session)
    })
    //tracking auth changes whilte app is running
    const {data:{subscription}}=supabase.auth.onAuthStateChange((session,event)=>{
      if(event === "SIGNED_IN" || event === "TOKEN_REFRESHED"){
        checkProfileAndSession(session)
      }
      if (event === "SIGNED_OUT") {
        router.replace("/");
      }
    })
    return () => subscription.unsubscribe();
  }, []);

  return(
    <Stack
    screenOptions={
      {
        headerShown:false,
        gestureEnabled:false
      }
    }>
      {/*landing page*/ }
      <Stack.Screen name="index"/>

      {/*login page*/ }
      <Stack.Screen name="login"/>

      {/*onboarding page*/ }
      <Stack.Screen name="onboarding"/>
    </Stack>
  )
  }
