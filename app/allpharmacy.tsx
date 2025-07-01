import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const pharmaciesData = {
  Buea: [
    {
      id: 1,
      name: 'JB Legacy Pharmacy',
      latitude: 4.157993621568943,
      longitude: 9.268399441932738,
      location: 'Bokoko\nFakoship entrance',
      number: '6533580',
    },
    {
      id: 2,
      name: 'Royal Pharmacy',
      latitude: 4.153485,
      longitude: 9.252577,
      location: 'Mermoz\nBuea',
      number: '2333225',
    },
    {
      id: 3,
      name: 'Enamen Pharmacy',
      latitude: 4.158888801169028,
      longitude: 9.282673805497508,
      location: 'Checkpoint,\nBuea',
      number: '6773173',
    },
    {
      id: 4,
      name: 'Mount Zion Pharmacy',
      latitude: 4.1529750226809465,
      longitude: 9.293537711247849,
      location: 'Express exchange,\nUB junction Molyko',
      number: '6741343',
    },
    {
      id: 5,
      name: 'Salvation Pharmacy',
      latitude: 4.155043229435648,
      longitude: 9.259848611247845,
      location: 'Great Soppo\nBuea',
      number: '2333230',
    },
    {
      id: 6,
      name: 'Mountain Pharmacy',
      latitude: 4.157900621568943,
      longitude: 9.268391041932738,
      location: 'Bongo Square\nBuea',
      number: '2333225',
    },
    {
      id: 7,
      name: 'Amazing Pharmacy',
      latitude: 4.157625978183683,
      longitude: 9.288141435282066,
      location: 'Malingo Street\nMolyko',
      number: '2333223',
    },
    {
      id: 8,
      name: 'Winner Pharmacy',
      latitude: 4.1550057566246625,
      longitude: 9.257621683865498,
      location: 'Small Soppo\nBuea',
      number: '2333225',
    },
    {
      id: 9,
      name: 'V-Holistic Pharmacy',
      latitude: 4.154492125877828,
      longitude: 9.252986826880422,
      location: 'Great Soppo\nBuea',
      number: '6811293',
    },
    {
      id: 10,
      name: 'Natures Pharmacy',
      latitude: 4.154492125877828,
      longitude: 9.252986826880422,
      location: 'Bomaka\nOppos Guest hous',
      number: '6741343',
    },
  ],
  Limbe: [
    {
      id: 11,
      name: 'Limbe Central Pharmacy',
      latitude: 4.0243,
      longitude: 9.2108,
      location: 'Down Beach\nLimbe',
      number: '6990001',
    },
    {
      id: 12,
      name: 'Atlantic Pharmacy',
      latitude: 4.0182,
      longitude: 9.2166,
      location: 'Mile 1\nLimbe',
      number: '6990002',
    },
  ],
  Tiko: [
    {
      id: 11,
      name: 'Limbe Central Pharmacy',
      latitude: 4.0243,
      longitude: 9.2108,
      location: 'Down Beach\nLimbe',
      number: '6990001',
    },
    {
      id: 12,
      name: 'Atlantic Pharmacy',
      latitude: 4.0182,
      longitude: 9.2166,
      location: 'Mile 1\nLimbe',
      number: '6990002',
    },
  ],
  Kumba: [
    {
      id: 11,
      name: 'Limbe Central Pharmacy',
      latitude: 4.0243,
      longitude: 9.2108,
      location: 'Down Beach\nLimbe',
      number: '6990001',
    },
    {
      id: 12,
      name: 'Atlantic Pharmacy',
      latitude: 4.0182,
      longitude: 9.2166,
      location: 'Mile 1\nLimbe',
      number: '6990002',
    },
  ],
Manfe: [
    {
      id: 11,
      name: 'Limbe Central Pharmacy',
      latitude: 4.0243,
      longitude: 9.2108,
      location: 'Down Beach\nLimbe',
      number: '6990001',
    },
    {
      id: 12,
      name: 'Atlantic Pharmacy',
      latitude: 4.0182,
      longitude: 9.2166,
      location: 'Mile 1\nLimbe',
      number: '6990002',
    },
  ],
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function PharmaciesScreen() {
  const [selectedTown, setSelectedTown] = useState('Buea');
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  const towns = Object.keys(pharmaciesData);
  const pharmacies = pharmaciesData[selectedTown] || [];

  const sortedPharmacies = pharmacies
    .map((ph) => {
      const distance = userLocation
        ? calculateDistance(userLocation.latitude, userLocation.longitude, ph.latitude, ph.longitude)
        : null;
      return { ...ph, distance };
    })
    .filter(ph => ph.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backRow}>
        <Ionicons name="arrow-back" size={20} color="black" />
        <Text style={styles.breadcrumb}>Home / pharmacy / South-West</Text>
      </TouchableOpacity>

      <Text style={styles.regionTitle}>South-West Region</Text>
      <View style={styles.townSelector}>
        {towns.map((town) => (
          <TouchableOpacity key={town} onPress={() => setSelectedTown(town)} style={styles.townButton}>
            <Ionicons name="eye-outline" size={14} color="#0B82DC" />
            <Text style={styles.townText}>{town}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Pharmacy"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text style={styles.subTitle}>Pharmacies in {selectedTown}</Text>

      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.header]}>Pharmacies</Text>
        <Text style={[styles.cell, styles.header]}>Location</Text>
        <Text style={[styles.cell, styles.header]}>Number</Text>
        <Text style={[styles.cell, styles.header]}>Distance</Text>
      </View>

      {sortedPharmacies.map((pharmacy) => (
        <View key={pharmacy.id} style={styles.tableRow}>
          <Text style={styles.cell}>{pharmacy.name}</Text>
          <Text style={styles.cell}>{pharmacy.location}</Text>
          <Text style={styles.cell}>{pharmacy.number}</Text>
          <Text style={styles.cell}>{pharmacy.distance ? `${pharmacy.distance.toFixed(2)} km` : '...'} </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 40,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  breadcrumb: {
    color: '#0077CC',
    fontSize: 13,
    marginLeft: 6,
  },
  regionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  townSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  townButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  townText: {
    marginLeft: 5,
    color: '#0B82DC',
    textDecorationLine: 'underline',
    fontSize: 13,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#d2f0dc',
    paddingVertical: 6,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    fontSize: 12,
  },
  header: {
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
