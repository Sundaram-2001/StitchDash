import { Stack } from "expo-router";

export default function RootLayout() {
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