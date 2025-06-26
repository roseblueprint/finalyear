import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PharmacyTownsScreen() {
const router = useRouter();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* 🖼️ Section Image avec texte et bouton */}
      <ImageBackground
        source={require('../../assets/images/pharma1.png')}
        style={styles.heroSection}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.heroText}>
            In need of accessing all legal documents revolving around pharmacies or drugs?
          </Text>
          <TouchableOpacity style={styles.heroButton} onPress={() => {/* navigation vers doc */}}>
            <Text style={styles.heroButtonText}>Search in Pharmacies Document</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* 📞 Bloc Urgent Numbers */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="alert-circle-outline" size={20} color="#0B82DC" />
          <Text style={styles.cardTitle}>Cameroon Urgent Numbers</Text>
        </View>
        {[
          { name: 'Ambulance', number: '119' },
          { name: 'Police officer', number: '117' },
          { name: 'Fire fighter', number: '118' },
          { name: 'Electricity Emergency', number: '8010' }
        ].map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.city}>{item.name}</Text>
            <Ionicons name="call-outline" size={16} color="#0B82DC" />
            <Text style={styles.phoneNumber}>{item.number}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View more numbers</Text>
        </TouchableOpacity>
      </View>

      {/* 🏥 Bloc Pharmacies */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="medkit-outline" size={20} color="#0B82DC" />
          <Text style={styles.cardTitle}>Pharmacies</Text>
        </View>
        {['Dschang', 'Bafoussam', 'Buea', 'Yaoundé'].map((city, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.city}>{city}</Text>
            <Ionicons name="call-outline" size={16} color="#0B82DC" />
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => router.push('/pharmacies_town')}>
          <Text style={styles.buttonText}>View all towns</Text>
        </TouchableOpacity>
      </View>

      {/* 📢 Bloc Announcements */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="megaphone-outline" size={20} color="#0B82DC" />
          <Text style={styles.cardTitle}>Announcement</Text>
        </View>
        {['Dschang', 'Bafoussam', 'Buea', 'Yaoundé'].map((city, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.city}>{city}</Text>
            <Ionicons name="call-outline" size={16} color="#0B82DC" />
            <Text style={styles.phoneNumber}>+237 6XX XXX XXX</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View more announcement</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroSection: {
    height: 220,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heroText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
  },
  heroButton: {
    backgroundColor: '#0B82DC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    opacity: 0.9,
  },
  heroButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderColor: '#eee',
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.7,
    borderBottomColor: '#e6e6e6',
  },
  city: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  phoneNumber: {
    fontSize: 13,
    color: '#0B82DC',
    marginLeft: 8,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#0B82DC',
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 13,
  },
});
