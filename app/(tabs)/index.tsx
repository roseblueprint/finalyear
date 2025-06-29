import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';



const recentSearch = ["Hexagon", "Friconazole", "Syrop", "Oxitoxine", "Doliprane", "Sinutab"];

const pharmacies = [
  {
    id: 1,
    name: 'JB Legacy Pharmacy',
    latitude: 4.157993621568943,  
    longitude: 9.268399441932738 ,
    image: require('../../assets/images/pharmacy1.png'),
  },
  {
    id: 2,
    name: 'Royal Pharmacy',
    latitude: 4.153485,
    longitude: 9.252577, 
    image: require('../../assets/images/pharmacy2.png'),
  },
  { 
    id: 3,
    name: 'Enamen Pharmacy',
    latitude: 4.158888801169028, 
    longitude: 9.282673805497508,
    image: require('../../assets/images/pharmac3.jpg'),    
  },
  {
    id: 4,
    name: 'Mount Zion Pharmacy',
    latitude: 4.1529750226809465,  
    longitude: 9.293537711247849,
    image: require('../../assets/images/pharmacy4.png'),
  },
  {
    id: 5,
    name: 'Salvation Pharmacy',
    latitude: 4.155043229435648,   
    longitude: 9.259848611247845,
    image: require('../../assets/images/pharmacy5.png'),
  },
  {
    id: 6,
    name: 'Kenem Pharmacy',
    latitude: 4.166828441786548,
    longitude:  9.300157731461844,
    image: require('../../assets/images/pharma2.png'),
  },
  {
    id: 7,
    name: 'Amazing Pharmacy',
    latitude: 4.157625978183683, 
    longitude: 9.288141435282066,
    image: require('../../assets/images/pharmacy8.png'),
  },
  {
    id: 8,
    name: 'Winner Pharmacy',
    latitude: 4.1550057566246625, 
    longitude:  9.257621683865498,
    image: require('../../assets/images/pharmacy8.png'),
  },
  {
    id: 9,
    name: 'V-Holistic Pharmacy',
    latitude: 4.154492125877828, 
    longitude: 9.252986826880422,
    image: require('../../assets/images/pharma1.png'),
  },
  {
    id: 10,
    name: 'compassionate health Pharmacy',
    latitude: 4.154492125877828, 
    longitude: 9.252986826880422,
    image: require('../../assets/images/pharma2.png'),
  },
];

 function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}


export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [distanceFilter, setDistanceFilter] = useState(3);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const router = useRouter();

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

    useEffect(() => {
    if (location) {
      const userLat = location.coords.latitude;
      const userLon = location.coords.longitude;
      const updated = pharmacies.map(ph => {
        const dist = getDistanceFromLatLonInKm(userLat, userLon, ph.latitude, ph.longitude);
        return { ...ph, distance: dist };
      }).filter(ph => ph.distance <= distanceFilter);

      setFilteredPharmacies(updated);
    }
  }, [location, distanceFilter]);

  return (
    <View style={styles.container}>
      {/* 🔍 Barre de recherche */}
      <View style={styles.searchContainer}>
        <Image source={require('../../assets/images/logo1.png')} style={styles.logo} />
        <View style={styles.inputWrapper}>
          <Ionicons name="search" size={20} color="#0B82DC" />
           
           <TouchableOpacity onPress={() => router.push('/drugsearch')}>
              <Text style={styles.searchPlaceholder}>Search Your Drug</Text>           
            </TouchableOpacity>
          
          <Ionicons name="camera-outline" size={22} color="#444" />
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle-outline" size={30} color="#0B82DC" />
        </TouchableOpacity>
      </View>

      {/* 🗺️ MapView */}
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
          {pharmacies.map((pharmacy) => (
            <Marker
              key={pharmacy.id}
              coordinate={{ latitude: pharmacy.latitude, longitude: pharmacy.longitude }}
              title={pharmacy.name}
              pinColor="green"
            />
          ))}
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Loading map...</Text>
      )}

      {/* 📜 Scrollable content */}
     
        <View style={styles.filterContainer}>
    <Text style={styles.sectionTitle}>View Pharmacies within</Text>
    <Picker
      selectedValue={distanceFilter}
      style={styles.pickerStyle}
      onValueChange={(itemValue) => setDistanceFilter(itemValue)}
    >
      <Picker.Item label="1 km" value={1} />
      <Picker.Item label="2 km" value={2} />
      <Picker.Item label="3 km" value={3} />
      <Picker.Item label="5 km" value={5} />
    </Picker>
  </View>
);
       <ScrollView style={styles.scrollSection} showsVerticalScrollIndicator={false}>
        <FlatList
        data={filteredPharmacies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.pharmacyCard}>
            <Image source={item.image} style={styles.pharmacyImage} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.pharmacyName}>{item.name}</Text>
              <Text style={styles.pharmacyDetails}>📍 Buea, Small Soppo</Text>
              <Text style={styles.pharmacyDetails}>🕒 Mon to Sun | 7am - 7pm</Text>
              <Text style={styles.pharmacyDistance}>Distance: {item.distance.toFixed(2)} km</Text>
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

        <Text style={styles.sectionTitle}>Recent search</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.searchTags}>
          {recentSearch.map((item, index) => (
            <Text key={index} style={styles.searchTag}>{item}</Text>
          ))}
        </ScrollView>

        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>You haven't Updated any drugs yet</Text>
          <TouchableOpacity>
            <Text style={styles.noticeLink}>Date Drug Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
      
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 35, backgroundColor: '#fff' },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 2, paddingVertical: 10,
    backgroundColor: '#fff', marginHorizontal: 10,
    borderRadius: 12, paddingBottom: 15,
  },
  searchPlaceholder: {
  color: '#666',
  fontSize: 14,
  paddingHorizontal: 10,
  marginHorizontal:10,
  marginRight:70
},
 filterContainer: {
  paddingHorizontal: 10,
  paddingVertical: 0,
  backgroundColor: '#fff',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
  pickerStyle: {
  width: 100,
  height: 60,
  color: '#000',
  marginLeft: 10,
},

  logo: { width: 30, height: 30, resizeMode: 'contain', marginRight: 8 },
  inputWrapper: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#f2f2f2', borderRadius: 30,
    paddingHorizontal: 10, paddingVertical: 6, marginRight: 10,
  },
  searchInput: { flex: 1, fontSize: 15, marginHorizontal: 8, color: '#000' },
  map: { height: 270, width: '100%', borderRadius: 12, marginBottom: 0 },
  loadingText: { textAlign: 'center', fontSize: 14, color: '#666', marginVertical: 10 },
  scrollSection: { flex: 1, paddingBottom: 40 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginHorizontal: 10, marginTop: 10 },
  pharmacyCard: {
    flexDirection: 'row', backgroundColor: '#f8f8f8',
    marginHorizontal: 10, marginVertical: 4,
    padding: 10, borderRadius: 12, alignItems: 'flex-start'
  },
  pharmacyImage: { width: 70, height: 60, borderRadius: 8 },
  pharmacyName: { fontWeight: 'bold', fontSize: 14, marginBottom: 10 },
  pharmacyDetails: { fontSize: 12, color: '#555' },
  phoneNumber: { fontSize: 12, color: '#333', marginBottom: 5 },
  viewDrug: { color: '#0B82DC', textDecorationLine: 'underline', fontSize: 12, marginTop: 15 },
  viewAll: { color: '#0B82DC', textAlign: 'right', marginRight: 15, fontSize: 12 },
  searchTags: { paddingLeft: 10, paddingTop: 5, paddingBottom: 10 },
  searchTag: {
    backgroundColor: '#f2f2f2', paddingHorizontal: 12,
    paddingVertical: 6, marginRight: 8, borderRadius: 20, fontSize: 12
  },
  pharmacyDistance: {
  fontSize: 12,
  color: '#0B82DC',
  marginTop: 4,
},
  noticeContainer: { alignItems: 'center', marginTop: 20, paddingBottom: 30 },
  noticeText: { fontSize: 12, color: '#777' },
  noticeLink: { color: '#0B82DC', fontSize: 13, fontWeight: 'bold' },
})