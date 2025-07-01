import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import  {pharmacies}  from '../app/data/pharmacies';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';



export default function PharmacyInfoScreen() {
  const { id } = useLocalSearchParams();
    const router = useRouter();
  const pharmacy = pharmacies.find(p => p.id === Number(id));

   console.log('params:', id); // doit afficher un nombre
   if (!pharmacy) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pharmacy not found.</Text>
    </View>
  );
}

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backRow}>
        <Ionicons name="arrow-back" size={20} color="black" />
        <Text style={styles.breadcrumb}>Home / Pharmacy Info</Text>
      </TouchableOpacity>

      <Image source={pharmacy.image} style={styles.image} />

      <Text style={styles.title}>{pharmacy.name}</Text>

      <View style={styles.row}><Ionicons name="location-outline" size={18} color="#0B82DC" />
        <Text style={styles.text}>{pharmacy.location}</Text></View>

      <View style={styles.row}><Ionicons name="call-outline" size={18} color="#0B82DC" />
        <Text style={styles.link} onPress={() => Linking.openURL(`tel:${pharmacy.number}`)}>{pharmacy.number}</Text></View>

      <Text style={styles.section}>Available Drugs</Text>
      {pharmacy.drugs.map((drug, index) => (
        <View key={index} style={styles.drugRow}>
          <FontAwesome5 name="capsules" size={16} color="#0B82DC" />
          <Text style={styles.drugText}>{drug.name} - <Text style={styles.price}>{drug.price} XAF</Text></Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', marginTop: 30 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  breadcrumb: { marginLeft: 6, color: '#0B82DC', fontSize: 13 },
  image: { width: '100%', height: 180, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  text: { fontSize: 14, marginLeft: 6 },
  link: { fontSize: 14, marginLeft: 6, color: '#0B82DC' },
  section: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  drugRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  drugText: { fontSize: 14, marginLeft: 6 },
  price: { fontWeight: '600', color: '#0B82DC' },
});


