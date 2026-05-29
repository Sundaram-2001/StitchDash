import { useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {getToken} from "../lib/tokenExtract"
import { router } from "expo-router";
  
const handleSubmit=async()=>{
  setLoading(true)
  console.log("Submitting:", {name,email,phoneNumber,address})
  try {
    const token=await getToken()
    const response=await fetch("http://localhost:3000/api/onboarding",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        name,email,address,phoneNumber
      })
    })
    const result=await response.json()
    if(response.ok){
      console.log("Profile updated successfully in the db",result)
      router.replace("/(tabs)/dashboard")
    }
    else{
      console.errror("server rejected the data:", result.error)
      alert(result.error||"Failed to save data")
    }
  } catch (error) {
    console.error("API failure", error)
    alert("Unknown Network!")
  }
  finally{
    setLoading(false)
  }
}

export default function Onboarding(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Text style={styles.title}>Tell us a little about yourself</Text>
      
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        autoCorrect={false}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmail}
        autoCorrect={false}
        keyboardType="email-address"
        style={styles.input}
      />
      
      <TextInput
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        autoCorrect={false}
        keyboardType="phone-pad"
        style={styles.input}
      />
      
      <TextInput
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
        autoCorrect={false}
        style={styles.input}
      />

      <Pressable
        disabled={loading} 
        style={({ pressed }) => [
          styles.button,
          loading && styles.buttonDisabled,
          pressed && !loading && styles.buttonPressed
        ]}
      >
        
        {loading ? (
          <ActivityIndicator color="#01190d" /> 
        ) : (
          <Text style={styles.buttonText}>Submit Profile</Text>
        )}
      </Pressable>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 24, color: "#01190d" },
  input: { borderBottomWidth: 1, borderColor: "#ccc", marginBottom: 20, padding: 8, fontSize: 16 },
  button: { backgroundColor: "#208450", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonDisabled: { backgroundColor: "#a3d3ba" }, 
  buttonPressed: { opacity: 0.8 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});