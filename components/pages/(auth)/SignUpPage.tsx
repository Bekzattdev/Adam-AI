import {  Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SignUpPage = () => {
  const router = useRouter();
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
    setErrors((prev) => ({ ...prev, [inputName]: "" })); // Очистка ошибки при фокусе
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

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    if (!age) newErrors.age = "Поле обязательно для заполнения";
    if (!selectedGender) newErrors.gender = "Выберите пол";
    if (!email || !validateEmail(email))
      newErrors.email =
        "Этот адрес выглядит некорректно. Проверьте его еще раз.";
    if (!password || !validatePassword(password))
      newErrors.password = "Минимум 8 символов, хотя бы одна цифра и буква.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Форма отправлена:", {
        age,
        email,
        password,
        selectedGender,
      });
      router.push("/CheckPassword"); // Переход на страницу успеха
    }
  };
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <SafeAreaView style={scss.signUp}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={scss.content}>
          <Image source={require("@/assets/images/3.png")} style={scss.logo} />
          <View style={scss.head}>
            <Text style={scss.title}>
              Создайте аккаунт, чтобы начать работу
            </Text>
            <Text>
              Уже есть аккаунт?{" "}
              <Text style={scss.route} onPress={() => router.push("/SignIn")}>
                Войдите
              </Text>
            </Text>
          </View>
          <View style={[scss.form, hasErrors && scss.formWithErrors]}>
            <TextInput
              keyboardType="numeric"
              placeholder="Возраст"
              value={age}
              onChangeText={setAge}
              style={[
                scss.input,
                {
                  borderColor: errors.age
                    ? "#FF0000"
                    : focusedInput === "age"
                    ? "#56F447"
                    : "#8FA0B6",
                },
              ]}
              onFocus={() => handleFocus("age")}
              onBlur={handleBlur}
            />
            {errors.age && <Text style={scss.errorText}>{errors.age}</Text>}
            <View style={scss.gender}>
              {["Не указывать", "Муж", "Жен"].map((gender) => (
                <TouchableOpacity
                  key={gender}
                  style={[
                    scss.btn_gender,
                    selectedGender === gender && { borderColor: "#56F447" },
                  ]}
                  onPress={() => handleGenderSelect(gender)}
                >
                  <Text
                    style={[
                      scss.text_gender,
                      selectedGender === gender && { color: "#000" },
                    ]}
                  >
                    {gender}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.gender && (
              <Text style={scss.errorText}>{errors.gender}</Text>
            )}
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
                placeholder="Создать пароль"
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
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={scss.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity style={scss.btn_reg} onPress={handleSubmit}>
              <Text style={scss.btnText_reg}>Создать аккаунт</Text>
            </TouchableOpacity>
          </View>
          <View style={scss.main}>
            <View style={scss.long} />
            <Text style={scss.text_long}>Или</Text>
            <View style={scss.long} />
          </View>
          <View style={scss.box_btn}>
            <TouchableOpacity style={scss.btn}>
              <Ionicons name="logo-apple" size={22} />
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
      </ScrollView>
    </SafeAreaView>
  );
};

const scss = StyleSheet.create({
  // !Верхний блок
  signUp: {
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
    gap: 12,
  },
  formWithErrors: {
    gap: 8,
  },
  gender: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn_gender: {
    width: "33%",
    height: 27,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderColor: "#8FA0B6",
  },
  text_gender: {
    fontSize: 12,
    color: "#8FA0B6",
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
  btn_reg: {
    borderRadius: 20,
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B64FC",
  },
  btnText_reg: {
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

export default SignUpPage;
