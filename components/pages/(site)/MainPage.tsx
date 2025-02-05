import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const MainPage = () => {
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Добрый день, Настя. Я ваш персональный помощник по уходу за кожей.",
      sender: "ai",
    },
  ]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleSend = () => {
    if (userInput.trim()) {
      setChatMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: userInput, sender: "user" },
        {
          id: prev.length + 2,
          text: "Спасибо за ваш запрос! Я готов помочь.",
          sender: "ai",
        },
      ]);
      setUserInput("");
      Keyboard.dismiss();
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const handleImagePick = async () => {
    setLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setChatMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: "Фото успешно отправлено!", sender: "user" },
        {
          id: prev.length + 2,
          text: "Фото получено. Я анализирую данные.",
          sender: "ai",
        },
      ]);
    }
    setLoading(false);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView style={styles.mainPage}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu}>
            <MaterialCommunityIcons name="menu" size={32} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Adam AI</Text>
        </View>

        {/* Chat Section */}
        <ScrollView
          style={styles.chatContainer}
          ref={scrollViewRef} // Привязываем реф
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {chatMessages.map((item) => (
            <View
              key={item.id}
              style={
                item.sender === "ai" ? styles.aiMessage : styles.userMessage
              }
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Отправить сообщение..."
            value={userInput}
            onChangeText={setUserInput}
            placeholderTextColor="#6b6b6b" 
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            {loading ? (
              <MaterialCommunityIcons name="loading" size={24} color="#fff" />
            ) : (
              <MaterialCommunityIcons name="send" size={24} color="#fff" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton} onPress={handleImagePick}>
            <MaterialCommunityIcons
              name="camera-plus-outline"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Modal for Menu */}
        <Modal
          visible={menuVisible}
          transparent
          animationType="slide"
          onRequestClose={toggleMenu}
        >
          <View style={styles.menuContainer}>
            <Text style={styles.menuItem}>Профиль</Text>
            <Text style={styles.menuItem}>Настройки</Text>
            <Text style={styles.menuItem}>Выход</Text>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainPage: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e8f4ff",
    borderRadius: 16,
    padding: 12,
    marginVertical: 8,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#c2f2ff",
    borderRadius: 16,
    padding: 12,
    marginVertical: 8,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#3B64FC",
    padding: 12,
    borderRadius: 25,
  },
  cameraButton: {
    marginLeft: 8,
    backgroundColor: "#3B64FC",
    padding: 12,
    borderRadius: 25,
  },
  menuContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menuItem: {
    backgroundColor: "#fff",
    padding: 16,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
});

export default MainPage;
