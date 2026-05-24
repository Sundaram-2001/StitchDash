import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../lib/supabase"; 

export default function RootLayout() {
  useEffect(() => {
    const checkProfileExists = async (session) => {
      if (!session) {
        router.replace("/login");
        return;
      }
      try {
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("account_type")
          .eq("user_id", session.user.id)
          .single();

        if (profileError || !profile) { 
          router.replace("/onboarding");
        } else {
          router.replace("/dashboard");
        }
      } catch (error) {
        console.error("Routing engine crash:", error); 
        router.replace("/onboarding");
      }
    };

    // To check the session at app startup
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkProfileExists(session);
    });

    // To keep live tracking of the app auth state change
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      checkProfileExists(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Stack
        screenOptions={{
        headerShown: false, // remove header
        gestureEnabled: false // swipe bak feature
        }}
    >
      {/* Landing Page */}
        <Stack.Screen name="index" />
        
      {/* Sign In Screen */}
        <Stack.Screen name="login" />
        
      {/* Onboarding Screen  */}
        <Stack.Screen name="onboarding" />
    </Stack>
  );
}