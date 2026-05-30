import { useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../lib/tokenExtract";
import { router } from "expo-router";

export default function Onboarding() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  //handling the submision
  const handleSubmit = async () => {
    console.log(
      "the form submission has been initialized!"
    )
    setLoading(true);
    console.log("Submitting:", { name, email, phoneNumber, address });
    
    try {
      const token = await getToken();
      console.log("token fetched")
      const response = await fetch("https://frisbee-sprung-charbroil.ngrok-free.dev/api/v1/customer-onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email,
          address,
          phoneNumber
        })
      });

      const result = await response.json();
      console.log("response received")
      if (response.ok) {
        console.log("Profile updated successfully in the db", result);
        router.replace("/(tabs)/dashboard");
      } else {
        console.error("Server rejected the data:", result.error);
        alert(result.error || "Failed to save data");
      }
    } catch (error) {
      console.error("API failure", error);
      alert("Unknown Network Failure!!");
    } finally {
      setLoading(false);
    }
  };

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
          onPress={handleSubmit} // 🟢 FIXED: Added the onPress trigger event handler!
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