import { router, Stack } from "expo-router"
import { supabase } from "../lib/supabase"
import { Alert } from "react-native"
import { useEffect } from "react"

export default function RootLayout() {
  useEffect(() => {
    const checkProfileAndSession = async (session) => {
      // route to login for no session
      if (!session) {
        router.replace("/login")
        return 
      }

      // session is there, verify is profile exists
      try {
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("account_type")
          .eq("id", session.user.id) 
          .single()

        // Profile ris not there, route to onboarding page
        if (!profile || profileError) {
          router.replace("/onboarding")
          return
        }

        // Profile found, but accunt i registered as tailor
        if (profile.account_type !== "customer") {
          Alert.alert("Access Denied", "This account is registered as a Tailor. Kindly use a new email!")
          await supabase.auth.signOut()
          router.replace("/login")
          return
        }

        // session and profile exists so go to dashboard
        router.replace("/dashboard")
      } catch (error) {
        console.error("Unexpected authentication routing failure:", error)
        router.replace("/login")
      }
    }

    // Rinitial auth check at start of the app
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkProfileAndSession(session)
    })

    // auth checks suring he runtime of the app
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        checkProfileAndSession(session)
      }
      if (event === "SIGNED_OUT") {
        router.replace("/login")
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}
    >
      {/* Primary Routing Stack Definitions */}
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="onboarding" />
    </Stack>
  )
}