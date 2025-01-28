
import { Stack, Tabs } from "expo-router";
import { Image, View } from "react-native";


const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name="Welcome" options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" options={{headerShown: true}}/>
        <Stack.Screen name="CheckPassword" options={{headerShown: true}}/>
        <Stack.Screen name="SignIn" options={{headerShown: true}}/>
        <Stack.Screen name="RessetPassword" options={{headerShown: true}}/>
        <Stack.Screen name="Subscription" options={{headerShown: true}}/>
    </Stack>
  );
};

export default _layout;
