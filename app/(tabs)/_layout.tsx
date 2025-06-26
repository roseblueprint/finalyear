import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Ionicons} from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

console.log("Layout applied ✅");

export default function TabsLayout() {
  return (
   <Tabs
  screenOptions={{
    tabBarActiveTintColor: '#212121',
    headerStyle: {
      backgroundColor: '#ffff',
    },
    headerShadowVisible: false,
    headerTintColor: '#fff',
    tabBarStyle: {
      backgroundColor: '#fff',
    },
  }}
>
      

      <Tabs.Screen name="scan" options={{ 
        headerShown: false,
        tabBarIcon:({focused, color})=> 
            <MaterialCommunityIcons name= {focused? "credit-card-scan": "credit-card-scan-outline" }
        size={24} color="blue" />
       }} />

      <Tabs.Screen name="pharmacy" options={{ 
        headerShown: false,
        tabBarIcon:({focused, color})=> 
            <MaterialCommunityIcons name= {focused? "hospital-box": "hospital-box-outline" }
        size={24} color="blue" />
       }} />

       <Tabs.Screen name="index" options={{ 
        headerShown: false,
        tabBarIcon:({focused, color})=> 
            <Ionicons 
                name={focused? "home" :"home-outline"} 
                size={24} 
                color="blue" />
       }} />
     
      <Tabs.Screen name="alarm" options={{ 
        headerShown: false,
        tabBarIcon:({focused, color})=> 
            <Ionicons 
                name={focused? "alarm" :"alarm-outline"} 
                size={24} 
                color="blue" />
       }} />

      <Tabs.Screen name="document" options={{ 
        headerShown: false,
        tabBarIcon:({focused, color})=> 
            <Ionicons 
                name={focused? "document-text" :"document-text-outline"} 
                size={24} 
                color="blue" />
       }} />
      
    </Tabs>
  )
}
