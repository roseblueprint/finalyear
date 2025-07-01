// DrugResultsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const pharmacies = [

  {
    id: 1,
    name: 'JB Legacy Pharmacy',
    latitude: 4.157993621568943,
    longitude: 9.268399441932738,
    location: 'Bokoko\nFakoship entrance',
    number: '6533580',
    image: require('../assets/images/pharmacy1.png'),
    drugs: [
      { name: 'Paracetamol', price: 150 },
      { name: 'Ibuprofen', price: 180 },
      { name: 'Amoxicillin', price: 200 },
      { name: 'Cough Syrup', price: 220 },
      { name: 'Vitamin C', price: 100 },
    ],
  },
  {
    id: 2,
    name: 'Royal Pharmacy',
    latitude: 4.153485,
    longitude: 9.252577,
    location: 'Mermoz\nBuea',
    number: '2333225',
    image: require('../assets/images/pharmacy2.png'),
    drugs: [
      { name: 'Paracetamol', price: 140 },
      { name: 'Ibuprofen', price: 175 },
      { name: 'Amoxicillin', price: 210 },
      { name: 'Cough Syrup', price: 215 },
      { name: 'Vitamin C', price: 105 },
    ],
  },
  {
    id: 3,
    name: 'Enamen Pharmacy',
    latitude: 4.158888801169028,
    longitude: 9.282673805497508,
    location: 'Checkpoint,\nBuea',
    number: '6773173',
    image: require('../assets/images/pharmac3.jpg'),
    drugs: [
      { name: 'Paracetamol', price: 160 },
      { name: 'Ibuprofen', price: 185 },
      { name: 'Amoxicillin', price: 220 },
      { name: 'Cough Syrup', price: 225 },
      { name: 'Vitamin C', price: 110 },
    ],
  },
  {
    id: 4,
    name: 'Mount Zion Pharmacy',
    latitude: 4.1529750226809465,
    longitude: 9.293537711247849,
    location: 'Express exchange,\nUB junction Molyko',
    number: '6741343',
    image: require('../assets/images/pharmacy4.png'),
    drugs: [
      { name: 'Paracetamol', price: 155 },
      { name: 'Ibuprofen', price: 178 },
      { name: 'Amoxicillin', price: 205 },
      { name: 'Cough Syrup', price: 230 },
      { name: 'Vitamin C', price: 108 },
    ],
  },
  {
    id: 5,
    name: 'Salvation Pharmacy',
    latitude: 4.155043229435648,
    longitude: 9.259848611247845,
    location: 'Great Soppo\nBuea',
    number: '2333230',
    image: require('../assets/images/pharmacy5.png'),
    drugs: [
      { name: 'Paracetamol', price: 145 },
      { name: 'Ibuprofen', price: 180 },
      { name: 'Amoxicillin', price: 215 },
      { name: 'Cough Syrup', price: 235 },
      { name: 'Vitamin C', price: 102 },
    ],
  },
  {
    id: 6,
    name: 'Mountain Pharmacy',
    latitude: 4.157900621568943,
    longitude: 9.268391041932738,
    location: 'Bongo Square\nBuea',
    number: '2333225',
    image: require('../assets/images/pharma2.png'),
    drugs: [
      { name: 'Paracetamol', price: 148 },
      { name: 'Ibuprofen', price: 177 },
      { name: 'Amoxicillin', price: 212 },
      { name: 'Cough Syrup', price: 218 },
      { name: 'Vitamin C', price: 99 },
    ],
  },
  {
    id: 7,
    name: 'Amazing Pharmacy',
    latitude: 4.157625978183683,
    longitude: 9.288141435282066,
    location: 'Malingo Street\nMolyko',
    number: '2333223',
    image: require('../assets/images/pharmacy8.png'),
    drugs: [
      { name: 'Paracetamol', price: 142 },
      { name: 'Ibuprofen', price: 172 },
      { name: 'Amoxicillin', price: 208 },
      { name: 'Cough Syrup', price: 222 },
      { name: 'Vitamin C', price: 104 },
    ],
  },
  {
    id: 8,
    name: 'Winner Pharmacy',
    latitude: 4.1550057566246625,
    longitude: 9.257621683865498,
    location: 'Small Soppo\nBuea',
    number: '2333225',
    image: require('../assets/images/pharmacy8.png'),
    drugs: [
      { name: 'Paracetamol', price: 149 },
      { name: 'Ibuprofen', price: 174 },
      { name: 'Amoxicillin', price: 214 },
      { name: 'Cough Syrup', price: 216 },
      { name: 'Vitamin C', price: 98 },
    ],
  },
  {
    id: 9,
    name: 'V-Holistic Pharmacy',
    latitude: 4.154492125877828,
    longitude: 9.252986826880422,
    location: 'Great Soppo\nBuea',
    number: '6811293',
    image: require('../assets/images/pharma1.png'),
    drugs: [
      { name: 'Paracetamol', price: 147 },
      { name: 'Ibuprofen', price: 179 },
      { name: 'Amoxicillin', price: 213 },
      { name: 'Cough Syrup', price: 221 },
      { name: 'Vitamin C', price: 101 },
    ],
  },
  {
    id: 10,
    name: 'Natures Pharmacy',
    latitude: 4.154492125877828,
    longitude: 9.252986826880422,
    location: 'Bomaka\nOppos Guest hous',
    number: '6741343',
    image: require('../assets/images/pharma2.png'),
    drugs: [
      { name: 'Paracetamol', price: 143 },
      { name: 'Ibuprofen', price: 176 },
      { name: 'Amoxicillin', price: 209 },
      { name: 'Cough Syrup', price: 224 },
      { name: 'Vitamin C', price: 97 },
    ],
  },
];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function DrugResultsScreen() {
  const { drug } = useLocalSearchParams();
  const [userLocation, setUserLocation] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      }
    })();
  }, []);

  const results = pharmacies
    .map((ph) => {
      const foundDrug = ph.drugs.find((d) => d.name.toLowerCase() === (drug as string).toLowerCase());
      if (foundDrug) {
        const distance = userLocation
          ? calculateDistance(userLocation.latitude, userLocation.longitude, ph.latitude, ph.longitude)
          : null;
        return { ...ph, drug: foundDrug, distance };
      }
      return null;
    })
    .filter((item) => item !== null);

   return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backRow}>
        <Ionicons name="arrow-back" size={20} color="black" />
        <Text style={styles.breadcrumb}>Home / Drug Results</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Pharmacies with "{drug}"</Text>

      {results.map((pharmacy: any) => (
        <TouchableOpacity
        key={pharmacy.id}
    onPress={() => router.push({
      pathname: '/pharmacy_info',
      params: {
        id: pharmacy.id.toString(), // or pass more fields if needed
      }
    })}
  >
        <View key={pharmacy.id} style={styles.card}>
          <Image source={pharmacy.image} style={styles.image} />

          <View style={styles.infoBox}>
            <Text style={styles.name}>{pharmacy.name}</Text>
            <View style={styles.row}>
              <Ionicons name="location-outline" size={14} color="#0B82DC" />
              <Text style={styles.text}>{pharmacy.location}</Text>
            </View>

            <View style={styles.row}>
              <FontAwesome5 name="capsules" size={14} color="#0B82DC" />
              <Text style={styles.text}>{drug}: <Text style={styles.price}>{pharmacy.drug.price} XAF</Text></Text>
            </View>
          </View>

          <View style={styles.rightBox}>
            <View style={styles.row}>
              <Ionicons name="call-outline" size={14} color="#0B82DC" />
              <Text style={styles.phone}>{pharmacy.number}</Text>
            </View>

            <Text style={styles.available}>Available</Text>
            <View style={styles.row}>
              <Ionicons name="navigate" size={14} color="#0B82DC" />
              <Text style={styles.distance}>{pharmacy.distance ? `${pharmacy.distance.toFixed(1)} km away` : '...'} </Text>
            </View>
          </View>
        </View> </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff', marginTop: 30 },
  backRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  breadcrumb: { marginLeft: 6, color: '#0B82DC', fontSize: 13 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 20 },
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d1e3f4',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9fcff',
  },
  image: { width: 60, height: 60, borderRadius: 6, marginRight: 10 },
  infoBox: { flex: 1, justifyContent: 'space-between' },
  name: { fontWeight: 'bold', fontSize: 14 },
  text: { fontSize: 12, color: '#222' },
  price: { color: '#0B82DC', fontWeight: '600' },
  rightBox: { justifyContent: 'space-between', alignItems: 'flex-end' },
  phone: { fontSize: 12, color: '#333' },
  available: { color: 'green', fontWeight: '600', fontSize: 12 },
  distance: { fontSize: 12, color: '#0B82DC' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4, marginVertical: 2 },
});
