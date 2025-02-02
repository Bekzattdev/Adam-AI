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

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (error) setError(""); 
  };

  const handleBlur = () => {
    setFocusedInput(false);
    if (!validateEmail(email)) {
      setError("Этот адрес выглядит некорректно. Проверьте его еще раз.");
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (validateEmail(email)) {
      router.push("/");
    } else {
      setError("Этот адрес выглядит некорректно. Проверьте его еще раз.");
    }
  };

  return (
    <SafeAreaView style={scss.checkPass}>
      <View style={scss.content}>
        <View style={scss.text}>
          <Text style={scss.title}>Забыли пароль?</Text>
          <Text style={scss.mainText}>
            Введите e-mail, чтобы восстановить доступ
          </Text>
        </View>
        <View style={scss.box}>
          <TextInput
            keyboardType="email-address"
            placeholder="example@email.com"
            value={email}
            onChangeText={handleEmailChange}
            style={[
              scss.input,
              {
                borderColor: error
                  ? "#FF0000"
                  : focusedInput
                  ? "#56F447"
                  : "#8FA0B6", 
              },
            ]}
            onFocus={() => setFocusedInput(true)}
            onBlur={handleBlur}
          />
          {error && <Text style={scss.errorText}>{error}</Text>}
          <TouchableOpacity style={scss.check_btn} onPress={handleSubmit}>
            <Text style={scss.check_btn_text}>Отправить</Text>
          </TouchableOpacity>
          <Text style={scss.routeText} onPress={() => router.push("/SignIn")}>
            Вернуться назад
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const scss = StyleSheet.create({
  checkPass: {
    padding: 24,
  },
  content: {
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
    gap: 8,
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
    fontWeight: 700,
    top: 20,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    bottom: 4,
  },
});

export default ResetPassPage;