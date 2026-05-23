import { Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput, Pressable, StyleSheet, ScrollView, Dimensions } from "react-native"; 
import { useState } from "react";

const { width } = Dimensions.get("window");

export default function Onboarding() {
  // Simple local UI states
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState(""); //the person is customer or tailor 
  const [address, setAddress] = useState(""); // storing  address state
  
  const [specialization, setSpecialization] = useState([]);
  const [genders, setGenders] = useState([]);

  // Clean local toggles for UI feedback
  const toggleGenders = (item) => {
    if (genders.includes(item)) {
      setGenders(genders.filter((g) => g !== item));
    } else {
      setGenders([...genders, item]);
    }
  };

  const toggleSpecialization = (item) => {
    if (specialization.includes(item)) {
      setSpecialization(specialization.filter((s) => s !== item));
    } else {
      setSpecialization([...specialization, item]);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.card}>
              
              <Text style={styles.title}>Setup Profile</Text>
              <Text style={styles.subtitle}>Tell us a bit about yourself to customize your dashboard!</Text>

              {/* Input: Name */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="#94a3b8"
                  autoCorrect={false}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Input: Email */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Input: Phone */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter phone number"
                  placeholderTextColor="#94a3b8"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>

              {/* Select: Account Type Tabs */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>How will you use StitchDash?</Text>
                <View style={styles.pillContainer}>
                  <Pressable 
                    style={[styles.selectorPill, accountType === "customer" && styles.activeSelectorPill]}
                    onPress={() => {
                      setAccountType("customer");
                      setAddress(""); // Reset address field on switch
                    }}
                  >
                    <Text style={[styles.selectorPillText, accountType === "customer" && styles.activeSelectorPillText]}>Customer</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.selectorPill, accountType === "tailor" && styles.activeSelectorPill]}
                    onPress={() => {
                      setAccountType("tailor");
                      setAddress(""); // Reset address field on switch
                    }}
                  >
                    <Text style={[styles.selectorPillText, accountType === "tailor" && styles.activeSelectorPillText]}>Tailor Shop</Text>
                  </Pressable>
                </View>
              </View>

              {/* UI for customer */}
              {accountType === "customer" && (
                <View style={styles.dynamicSection}>
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Delivery / Residential Address</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your home address for orders"
                      placeholderTextColor="#94a3b8"
                      value={address}
                      onChangeText={setAddress}
                    />
                  </View>
                </View>
              )}

              {/* UI for tailors */}
              {accountType === "tailor" && (
                <View style={styles.dynamicSection}>
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Shop Address</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your street/shop address"
                      placeholderTextColor="#94a3b8"
                      value={address}
                      onChangeText={setAddress}
                    />
                  </View>

                  {/* Multi-Select Group: Genders */}
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Gender Specialization</Text>
                    <View style={styles.chipGroup}>
                      {["Men", "Women", "Kids"].map((item) => {
                        const isSelected = genders.includes(item);
                        return (
                          <Pressable
                            key={item}
                            style={[styles.chip, isSelected && styles.activeChip]}
                            onPress={() => toggleGenders(item)}
                          >
                            <Text style={[styles.chipText, isSelected && styles.activeChipText]}>{item}</Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>

                  {/* Multi-Select Group: Garments */}
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>What can you stitch?</Text>
                    <View style={styles.chipGroup}>
                      {["Blouse", "Lehenga", "Kurti", "Suits", "Shirts", "Alterations"].map((item) => {
                        const isSelected = specialization.includes(item);
                        return (
                          <Pressable
                            key={item}
                            style={[styles.chip, isSelected && styles.activeChip]}
                            onPress={() => toggleSpecialization(item)}
                          >
                            <Text style={[styles.chipText, isSelected && styles.activeChipText]}>{item}</Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                </View>
              )}

              {/* Submit Button */}
              <Pressable 
                style={({ pressed }) => [styles.submitButton, pressed && styles.buttonPressed]}
                onPress={() => console.log("Form data ready to ship:", { name, email, phoneNumber, accountType, address, genders, specialization })}
              >
                <Text style={styles.submitButtonText}>Complete Setup</Text>
              </Pressable>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", alignItems: "center", justifyContent: "center", paddingVertical: 40 },
  card: { width: width * 0.9, backgroundColor: "#1e293b", borderRadius: 20, padding: 24, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  title: { fontSize: 26, fontWeight: "800", color: "#f8fafc", textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: 13, color: "#94a3b8", textAlign: "center", marginBottom: 24, lineHeight: 18 },
  formGroup: { width: "100%", marginBottom: 16 },
  label: { fontSize: 12, fontWeight: "700", color: "#38bdf8", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 },
  input: { width: "100%", backgroundColor: "#0f172a", borderWidth: 1, borderColor: "#334155", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: "#f8fafc" },
  pillContainer: { flexDirection: "row", backgroundColor: "#0f172a", borderRadius: 10, padding: 4, borderWidth: 1, borderColor: "#334155" },
  selectorPill: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 8 },
  activeSelectorPill: { backgroundColor: "#38bdf8" },
  selectorPillText: { fontSize: 14, fontWeight: "600", color: "#94a3b8" },
  activeSelectorPillText: { color: "#0f172a" },
  dynamicSection: { width: "100%", borderTopWidth: 1, borderTopColor: "#334155", paddingTop: 16, marginTop: 8 },
  chipGroup: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderWidth: 1, borderColor: "#334155", backgroundColor: "#0f172a", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  activeChip: { borderColor: "#38bdf8", backgroundColor: "#38bdf815" },
  chipText: { fontSize: 13, color: "#94a3b8", fontWeight: "500" },
  activeChipText: { color: "#38bdf8", fontWeight: "700" },
  submitButton: { width: "100%", backgroundColor: "#38bdf8", borderRadius: 10, paddingVertical: 14, alignItems: "center", justifyContent: "center", marginTop: 12, minHeight: 48 },
  buttonPressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  submitButtonText: { color: "#0f172a", fontSize: 16, fontWeight: "700" }
});