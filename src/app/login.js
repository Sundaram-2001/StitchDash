import { useState } from "react";
import { 
  Platform, 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView, 
  Pressable, 
  ActivityIndicator, 
  Dimensions, 
  TouchableWithoutFeedback, 
  Keyboard,
  SafeAreaView // ⚡ Added for safe window backdrop painting
} from "react-native"; 

import { supabase } from "../lib/supabase";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

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
      email: email.trim().toLowerCase(),
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

    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: otp.trim(),
      type: "email",
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log("OTP verification successful!");
      router.replace("/onboarding");
    }
  };

  return (
    // 1. Outermost Layer: Safe Area paints the baseline canvas background dark slate
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      
      {/* 2. Secondary Layer: Avoids keyboard collisions cleanly */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* 3. Inside Layer: Dismisses the keyboard cleanly when tapping blank space */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.card}>
              
              {/* Header Branding */}
              <View style={styles.headerContainer}>
                <Text style={styles.brandTitle}>StitchDash</Text>
                <Text style={styles.brandSubtitle}>
                  {step === 1
                    ? "Welcome! Let's get your account verified."
                    : "Check your inbox for a verification code."}
                </Text>
              </View>

              {/* Error Banner */}
              {errorMessage ? (
                <View style={styles.errorBanner}>
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              ) : null}

              {step === 1 ? (
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="name@example.com"
                    placeholderTextColor="#94a3b8"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                    editable={!loading}
                  />

                  <Pressable
                    style={({ pressed }) => [
                      styles.primaryButton,
                      pressed && styles.buttonPressed,
                      loading && styles.buttonDisabled,
                    ]}
                    onPress={handleSendOtp}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#ffffff" size="small" />
                    ) : (
                      <Text style={styles.buttonText}>Send Code</Text>
                    )}
                  </Pressable>
                </View>
              ) : (
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Verification Code</Text>
                  <TextInput
                    style={[styles.input, styles.otpInput]}
                    placeholder="0 0 0 0 0 0"
                    placeholderTextColor="#94a3b8"
                    keyboardType="number-pad"
                    maxLength={6}
                    value={otp}
                    onChangeText={setOtp}
                    editable={!loading}
                  />

                  <Pressable
                    style={({ pressed }) => [
                      styles.primaryButton,
                      pressed && styles.buttonPressed,
                      loading && styles.buttonDisabled,
                    ]}
                    onPress={handleVerifyOtp}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#ffffff" size="small" />
                    ) : (
                      <Text style={styles.buttonText}>Verify & Continue</Text>
                    )}
                  </Pressable>

                  <Pressable
                    style={styles.secondaryButton}
                    onPress={() => {
                      if (!loading) {
                        setStep(1);
                        setOtp("");
                        setErrorMessage("");
                      }
                    }}
                  >
                    <Text style={styles.secondaryButtonText}>
                      Change email address
                    </Text>
                  </Pressable>
                </View>
              )}

            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
    paddingHorizontal: 20,
  },
  card: {
    width: width * 0.88,
    maxWidth: 400,
    padding: 28,
    backgroundColor: "#1e293b",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  headerContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#f8fafc",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  brandSubtitle: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  formGroup: {
    width: "100%",
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#38bdf8",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#f8fafc",
    marginBottom: 16,
  },
  otpInput: {
    textAlign: "center",
    fontSize: 22,
    letterSpacing: 8,
    fontWeight: "700",
  },
  errorBanner: {
    backgroundColor: "#ef444415",
    borderWidth: 1,
    borderColor: "#ef444430",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  errorText: {
    color: "#f87171",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: "#38bdf8",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#38bdf8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 52,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  buttonDisabled: {
    backgroundColor: "#475569",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    marginTop: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});