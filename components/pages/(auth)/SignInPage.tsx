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
    return password.length >= 8; 
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email || !validateEmail(email)) {
      newErrors.email = "Этот адрес выглядит некорректно. Проверьте его еще раз.";
    }
    if (!password || !validatePassword(password)) {
      newErrors.password = "Пароль должен содержать минимум 8 символов.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Форма отправлена:", { email, password });
      router.push("/Subscribtion"); 
    }
  };

  return (
    <SafeAreaView style={scss.signIn}>
      <View style={scss.content}>
        <Image source={require("@/assets/images/3.png")} style={scss.logo} />
        <View style={scss.head}>
          <Text style={scss.title}>Log in to your account to get started</Text>
          <Text>
            Еще нет аккаунта?{" "}
            <Text style={scss.route} onPress={() => router.push("/SignUp")}>
              Зарегистрируйся
            </Text>
          </Text>
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
                color="#8FA0B6"
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={scss.errorText}>{errors.password}</Text>
          )}
          <Text style={{fontWeight:700}} onPress={()=> router.push("/ResetPassword")}>Забыли пароль?</Text>

          <TouchableOpacity style={scss.btn_log} onPress={handleSubmit}>
            <Text style={scss.btnText_log}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={scss.main}>
          <View style={scss.long} />
          <Text style={scss.text_long}>Или</Text>
          <View style={scss.long} />
        </View>
        <View style={scss.box_btn}>
          <TouchableOpacity style={scss.btn}>
            <Ionicons name="logo-apple" size={22} color="#000" />
            <Text style={scss.btnText}>Продолжить с Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={scss.btn}>
            <Image
              source={require("@/assets/icons/search.png")}
              style={scss.google}
            />
            <Text style={scss.btnText}>Продолжить с Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const scss = StyleSheet.create({
  // !Верхний блок
  signIn: {
    padding: 24,
    flexDirection: "column",
  },
  content: {
    flexDirection: "column",
    gap: 24,
  },
  head: {
    gap: 8,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
  route: {
    color: "#3B64FC",
  },
  // !Средний блок
  form: {
    width: "100%",
    gap: 8,
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
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    top: 16,
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
    fontWeight: 700,
    color: "#fff",
  },
  errorText: {
    color: "#CF3838",
    fontSize: 12,
    bottom: 4,
  },
  // !Линия
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
  // !нижний блок
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
    fontWeight: 700,
  },
  google: {
    width: 16,
    height: 17,
  },
});

export default SignInPage;