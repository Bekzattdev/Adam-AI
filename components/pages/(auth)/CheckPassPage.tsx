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

const CheckPassPage = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [focusedInput, setFocusedInput] = useState(false);

  // Проверка кода
  const checkCode = (code: string) => {
    return /^\d{6}$/.test(code);
  };

  const handleCodeChange = (text: string) => {
    setCode(text);
    if (error) setError("");
  };

  const handleBlur = () => {
    setFocusedInput(false);
    if (!checkCode(code)) {
      setError("Код должен состоять из 6 цифр.");
    } else {
      setError("");
    }
  };

  const handleConfirm = () => {
    if (checkCode(code)) {
        router.push("/Subscribtion"); 
    } else {
      setError("Код должен состоять из 6 цифр.");
    }
  };

  return (
    <SafeAreaView style={scss.checkPass}>
      <View style={scss.content}>
        <View style={scss.text}>
          <Text style={scss.headerTitle}>Введите код безопасности</Text>
          <Text style={scss.headerSubtitle}>
            Введите 6-значный код, который отправлен на почту{" "}
            <Text style={scss.minText}>e******@gmail.com</Text>
          </Text>
        </View>
        <View style={scss.box}>
          <TextInput
            keyboardType="numeric"
            placeholder="Введите код из письма"
            value={code}
            onChangeText={handleCodeChange}
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
            maxLength={6}
          />
          {error && <Text style={scss.errorText}>{error}</Text>}
          <TouchableOpacity style={scss.check_btn} onPress={handleConfirm}>
            <Text style={scss.check_btn_text}>Подтвердить</Text>
          </TouchableOpacity>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  headerSubtitle: {
    fontSize: 14,
  },
  minText: {
    fontWeight: "700",
    color: "#000",
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
  errorText: {
    color: "#FF0000",
    fontSize: 14,
    bottom: 4,
  },
});

export default CheckPassPage;
