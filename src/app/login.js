import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendOtp = async () => {
    if (!email) {
      setErrorMessage("Kindly enter your email address!");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: true,
      },
    });
    setLoading(false);
    if (error) {
      setErrorMessage(error.message);
    } else {
      setStep(2);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setErrorMessage("Please enter the 6-digit otp!");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    const { data, error } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: "email",
    });
    setLoading(false);
    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log("OTP verification successful!");
      router.replace("/home");
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 ? (
        <View>
          <TextInput
            placeholder="enter your email.."
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Pressable onPress={handleSendOtp}>
            <Text>Enter!</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <TextInput
            placeholder="enter 6-digit otp.."
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
          <Pressable onPress={handleVerifyOtp}>
            <Text>Verify!</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});