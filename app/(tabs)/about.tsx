import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';



const recentSearch = ["Hexagon", "Friconazole", "Syrop", "Oxitoxine", "Doliprane", "Sinutab"];

export default function HomeScreen() {

const [location, setLocation] = useState<Location.LocationObject | null>(null);

useEffect(() => {
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Permission to access location was denied');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
  })();
}, []);


  const router = useRouter();
  return (
    <View style={styles.container}>

      {/* 🔍 Barre de recherche */}
      <View style={styles.searchContainer}>
  {/* Logo à gauche */}
  <Image
    source={require('../../assets/images/logo1.png')}
    style={styles.logo}
  />

  {/* Barre de recherche étendue */}
  <View style={styles.inputWrapper}>
    <Ionicons name="search" size={20} color="#0B82DC" />
    <TextInput
      placeholder="Search Your Drug"
      placeholderTextColor="#666"
      style={styles.searchInput}
    />
    <Ionicons name="camera-outline" size={22} color="#444" />
  </View>

  {/* Icône de profil à droite */}
  <TouchableOpacity onPress={() => router.push('/profile')}>
    <Ionicons name="person-circle-outline" size={30} color="#0B82DC" />
  </TouchableOpacity>
</View>


      {/* 🗺️ Map Placeholder
     {location ? (
  <MapView
    style={styles.map}
    initialRegion={{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}
    showsUserLocation={true}
  >
    <Marker
      coordinate={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }}
      title="You are here"
      pinColor="#0B82DC"
    />
  </MapView>
) : (
  <Text style={styles.loadingText}>Loading map...</Text>
)} */}


{/* just for testing i will have this as map */}
<Image
  source={require('../../assets/images/pharma1.png')}
    style={styles.map}
/>


  {/* 📜 Scrollable content below */}
      <ScrollView style={styles.scrollSection} showsVerticalScrollIndicator={false}>
        {/* 🏥 Pharmacies List */}
        <Text style={styles.sectionTitle}>View Pharmacies around your area</Text>

        <FlatList
          data={[1, 2, 3]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => (
            <View style={styles.pharmacyCard}>
              <Image
                source={require('../../assets/images/pharma1.png')}
                style={styles.pharmacyImage}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.pharmacyName}>Royal Pharmacies</Text>
                <Text style={styles.pharmacyDetails}>📍 Buea, Small soppo</Text>
                <Text style={styles.pharmacyDetails}>🕒 Monday to Monday | 7 am - 7 pm</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.phoneNumber}>📞 671-584-233</Text>
                <TouchableOpacity>
                  <Text style={styles.viewDrug}>View drugs</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <Text style={styles.viewAll}>View all nearby</Text>

        {/* 🔁 Recent Search (horizontal scroll) */}
        <Text style={styles.sectionTitle}>Recent search</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.searchTags}>
          {recentSearch.map((item, index) => (
            <Text key={index} style={styles.searchTag}>{item}</Text>
          ))}
        </ScrollView>

        {/* 🕐 Update drug notification */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>You haven’t Updated any drugs yet</Text>
          <TouchableOpacity>
            <Text style={styles.noticeLink}>Date Drug Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

      {/* 📱 Bottom Navigation Bar */}
      {/* <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomTab}>
          <Ionicons name="qr-code-outline" size={22} />
          <Text>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab}>
          <Ionicons name="medkit-outline" size={22} />
          <Text>Pharmacies</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bottomTab, styles.activeTab]}>
          <Ionicons name="home" size={22} color="#0B82DC" />
          <Text style={{ color: '#0B82DC' }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab}>
          <Ionicons name="alarm-outline" size={22} />
          <Text>Reminder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab}>
          <Ionicons name="document-text-outline" size={22} />
          <Text>Documents</Text>
        </TouchableOpacity>
      </View> */}
  
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10, backgroundColor: '#fff' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 12,
    paddingBottom: 15,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    marginHorizontal: 8,
    color: '#000',
  },
  profileIcon: {
    marginLeft: 8,
  },
  map: {
    height: 180,
    width: '100%',
    borderRadius: 12,
    marginBottom: 10,
  },
  scrollSection: {
    flex: 1,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 10,
    marginTop: 10
  },
  pharmacyCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 12,
    alignItems: 'flex-start'
  },
  pharmacyImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  pharmacyName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10
  },
  pharmacyDetails: {
    fontSize: 12,
    color: '#555'
  },
  phoneNumber: {
    fontSize: 12,
    color: '#333',
    marginBottom: 5
  },
  viewDrug: {
    color: '#0B82DC',
    textDecorationLine: 'underline',
    fontSize: 12,
    marginTop:15,
  },
  viewAll: {
    color: '#0B82DC',
    textAlign: 'right',
    marginRight: 15,
    fontSize: 12
  },
  searchTags: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  searchTag: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 20,
    fontSize: 12
  },
  noticeContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 30,
  },
  noticeText: {
    fontSize: 12,
    color: '#777'
  },
  noticeLink: {
    color: '#0B82DC',
    fontSize: 13,
    fontWeight: 'bold'
  }
});