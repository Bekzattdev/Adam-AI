import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerShadowVisible: false, 
        contentStyle:{
          backgroundColor:'#fff'
        }
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