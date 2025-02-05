import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { View, TouchableOpacity } from "react-native";

const _layout = () => {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerShadowVisible: false,
        headerBackVisible: false,
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 10 }}
            >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ) : null,
        contentStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen name="Welcome" options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="CheckPassword" />
      <Stack.Screen name="SignIn" />
      <Stack.Screen name="ResetPassword" />
      <Stack.Screen name="Subscribtion" />
      <Stack.Screen name="MoreDatails" />
    </Stack>
  );
};

export default _layout;
