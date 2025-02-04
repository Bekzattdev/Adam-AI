import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Adam AI",
        headerShadowVisible: false, 
        contentStyle:{
          backgroundColor:'#fff'
        }
      }}
    >
      <Stack.Screen name="MainPage" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;