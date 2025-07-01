import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from "expo-router";
import { LogBox, useColorScheme } from 'react-native';

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
    const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}  />
      <Stack.Screen 
      name="+not-found" 
      options={{
        headerTitle: "page not found",
        headerShown: false
      }} />
      <Stack.Screen 
      name="profile" 
      options={{
        headerTitle: "profile page",
        headerShown: false
      }} />
      <Stack.Screen 
        name="pharmacies_town" 
        options={{
          headerTitle: "profile page",
          headerShown: false
        }} />
        <Stack.Screen 
        name="allpharmacy" 
        options={{
          headerTitle: "profile page",
          headerShown: false
        }} />
        <Stack.Screen 
        name="drugsearch" 
        options={{
          headerTitle: "profile page",
          headerShown: false
        }} />
        <Stack.Screen 
        name="results" 
        options={{
          headerTitle: "profile page",
          headerShown: false
        }} />
        <Stack.Screen 
        name="herbalist" 
        options={{
          headerTitle: "profile page",
          headerShown: false
        }} />
        <Stack.Screen 
        name="pharmacy_info" 
        options={{
          headerTitle: "profile page",
          headerShown: false
        }} />
    </Stack> 
    </ThemeProvider>
  )
}
