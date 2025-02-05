import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

const ResetPassPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState(""); 
  const [error, setError] = useState(""); 
  const [focusedInput, setFocusedInput] = useState(false); 
  const [success, setSuccess] = useState(false);

  const validateEmail = (email:any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (text:any) => {
    setEmail(text);
    setError("");
    setSuccess(false);
  };

  const handleBlur = () => {
    setFocusedInput(false);
    if (!validateEmail(email)) {
      setError("This address looks incorrect. Check it again.");
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (validateEmail(email)) {
      setSuccess(true);
      setError("");
    } else {
      setError("This address looks incorrect. Check it again.");
    }
  };

  return (
    <SafeAreaView style={scss.checkPass}>
      <View style={scss.content}>
        <View style={scss.text}>
          <Text style={scss.title}>Forgot a password?</Text>
          <Text style={scss.mainText}>
            Enter your email to restore access
          </Text>
        </View>
        <View style={scss.box}>
          <TextInput
            keyboardType="email-address"
            placeholder="example@email.com"
            value={email}
            onChangeText={handleEmailChange}
            placeholderTextColor="#6b6b6b" 
            style={[
              scss.input,
              {
                borderColor: error
                  ? "#FF0000"
                  : success
                  ? "#56F447"
                  : focusedInput
                  ? "#56F447"
                  : "#8FA0B6", 
              },
            ]}
            onFocus={() => setFocusedInput(true)}
            onBlur={handleBlur}
          />
          {error && <Text style={scss.errorText}>{error}</Text>}
          {success && <Text style={scss.successText}>A recovery link has been sent to your email. Please check your inbox.</Text>}
          <TouchableOpacity style={scss.check_btn} onPress={handleSubmit}>
            <Text style={scss.check_btn_text}>Send</Text>
          </TouchableOpacity>
        </View>
          <Text style={scss.routeText} onPress={() => router.push("/SignIn")}>
          Go back
          </Text>
      </View>
    </SafeAreaView>
  );
};

const scss = StyleSheet.create({
  checkPass: {
  },
  content: {
    padding: 24,
    gap: 32,
  },
  text: {
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  mainText: {
    fontSize: 14,
  },
  box: {
    gap: 12,
  },
  input: {
    width: "100%",
    height: 58,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    fontSize: 14,
    color: "#000",
  },
  check_btn: {
    borderRadius: 20,
    width: "100%",
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B64FC",
  },
  check_btn_text: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "700",
  },
  routeText: {
    textAlign: "center",
    fontWeight: "700",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    bottom: 4,
  },
  successText: {
    color: "#000",
    fontSize: 12,
    bottom: 4,
  },
});

export default ResetPassPage;