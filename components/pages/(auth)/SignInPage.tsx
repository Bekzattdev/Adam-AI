import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SignInPage = () => {
  const router = useRouter();
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
    setErrors((prev) => ({ ...prev, [inputName]: "" }));
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasMinLength && hasLetter && hasNumber;
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email || !validateEmail(email)) {
      newErrors.email = "This address looks incorrect. Check it again.";
    }
    if (!password || !validatePassword(password)) {
      newErrors.password =
        "Minimum 8 characters, at least one number and letter.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Форма отправлена:", { email, password });
      router.push("/Subscribtion");
    }
  };

  const isFormValid = validateEmail(email) && validatePassword(password);

  return (
    <SafeAreaView style={scss.signIn}>
      <View style={scss.content}>
        <View style={scss.head}>
        <Image source={require("@/assets/images/3.png")} style={scss.logo} />
        <View style={{gap:8}}>
          <Text style={scss.title}>Sign in to get started</Text>
          <Text>
          Don't have an account yet?{" "}
            <Text style={scss.route} onPress={() => router.push("/SignUp")}>
            Register
            </Text>
          </Text>
        </View>
        </View>
        <View style={scss.form}>
          <TextInput
            keyboardType="email-address"
            placeholder="example@email.com"
            value={email}
            onChangeText={setEmail}
            style={[
              scss.input,
              {
                borderColor: errors.email
                  ? "#FF0000"
                  : focusedInput === "email"
                  ? "#56F447"
                  : "#8FA0B6",
              },
            ]}
            onFocus={() => handleFocus("email")}
            onBlur={handleBlur}
          />
          {errors.email && <Text style={scss.errorText}>{errors.email}</Text>}
          <View style={scss.passwordContainer}>
            <TextInput
              keyboardType="default"
              textContentType="oneTimeCode"
              secureTextEntry={!showPassword}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={[
                scss.input,
                {
                  borderColor: errors.password
                    ? "#FF0000"
                    : focusedInput === "password"
                    ? "#56F447"
                    : "#8FA0B6",
                },
              ]}
              onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
            />
            <TouchableOpacity
              style={scss.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={scss.errorText}>{errors.password}</Text>
          )}
          <Text
            style={{ fontWeight: "700",paddingTop:16,paddingBottom:16 }}
            onPress={() => router.push("/ResetPassword")}
          >
            Forgot password?
          </Text>

          <TouchableOpacity
            style={[
              scss.btn_log,
              { backgroundColor: isFormValid ? "#3B64FC" : "#B0B0B0" },
            ]}
            onPress={handleSubmit}
            disabled={!isFormValid}
          >
            <Text style={scss.btnText_log}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={scss.main}>
          <View style={scss.long} />
          <Text style={scss.text_long}>or</Text>
          <View style={scss.long} />
        </View>
        <View style={scss.box_btn}>
          <TouchableOpacity style={scss.btn}>
            <Ionicons name="logo-apple" size={22} color="#000" />
            <Text style={scss.btnText}>Continue with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={scss.btn}>
            <Image
              source={require("@/assets/icons/search.png")}
              style={scss.google}
            />
            <Text style={scss.btnText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const scss = StyleSheet.create({
  signIn: {
    padding: 24,
    flexDirection: "column",
  },
  content: {
    flexDirection: "column",
    gap: 32,
  },
  head: {
    gap: 12,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  route: {
    color: "#3B64FC",
  },
  form: {
    width: "100%",
  },
  input: {
    width: "100%",
    height: 58,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 20,
    color: "#000",
    borderColor: "#8FA0B6",
  },
  passwordContainer: {
    position: "relative",
    paddingTop:8
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    top: 25,
  },
  btn_log: {
    borderRadius: 20,
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B64FC",
  },
  btnText_log: {
    textAlign: "center",
    fontWeight: "700",
    color: "#fff",
  },
  errorText: {
    color: "#CF3838",
    fontSize: 12,
    bottom: 4,
  },
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  long: {
    width: 133,
    height: 1,
    backgroundColor: "#7A808C52",
  },
  text_long: {
    fontSize: 14,
    color: "#7A808C52",
  },
  box_btn: {
    gap: 12,
  },
  btn: {
    width: "100%",
    height: 48,
    gap: 8,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
  },
  btnText: {
    textAlign: "center",
    fontWeight: "700",
  },
  google: {
    width: 16,
    height: 17,
  },
});

export default SignInPage;
