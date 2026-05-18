import { Stack } from "expo-router";
export default function RootLayout(){
    return (<Stack
        screenOptions={{
            headerStyle:{backgroundColor:'#f1f5f4'},
            headerTintColor: '#000000',
            headerTitleStyle: { fontWeight: 'bold',
                color:'#0000'
            },
        }}
    >
        <Stack.Screen name="index" options={{headerShown:false}}/>
        <Stack.Screen name="login" options={{title:'Sign In'}}/>
    </Stack>)
}