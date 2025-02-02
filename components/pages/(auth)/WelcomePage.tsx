import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const WelcomePage = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={scss.welcome}>
      <Text style={scss.text}>Я ADAM AI - Ваш личный Врач и Помощник</Text>
      <View style={scss.main_buttons}>
        <TouchableOpacity style={scss.btn}>
          <MaterialIcons name="apple" size={25} color="#000" />
          <Text style={scss.btnText} onPress={()=> router.push('/Main')}>Продолжить с Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={scss.btn}>
          <Image
            source={require("@/assets/icons/search.png")}
            style={scss.google}
          />
          <Text style={scss.btnText}>Продолжить с Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/SignUp")}
          style={scss.btn}
        >
          <MaterialIcons name="mail" size={22} color="#000" />
          <Text style={scss.btnText}>
            Зарегистрироваться{"\n"}с электронной почтой
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> router.push("/SignIn")} style={scss.btn}>
          <Text style={scss.btnText}>Войти</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const scss = StyleSheet.create({
  welcome: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    position: "relative",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 200,
  },
  main_buttons: {
    position: "absolute",
    padding: 24,
    bottom: 0,
    gap: 12,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: "100%",
    color: "#D7EEFF",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#D7EEFF",
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
    fontSize: 14,
    fontWeight: 700,
    textAlign: "center",
  },
  google: {
    width: 16,
    height: 17,
  },
});

export default WelcomePage;
