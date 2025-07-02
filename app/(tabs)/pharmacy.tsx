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
        source={require('../../assets/images/pharmacies.png')}
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

       {/* 🌿 Cameroon Herbalist Section */}
    <View style={styles.herbalistCard}>
      <Text style={styles.herbalistTitle}>🌿 Cameroon Herbalist</Text>

      <View style={styles.herbalistRow}>
        <Text style={styles.herbalistDesc}>Tropical santé, Yde</Text>
        <Text style={styles.herbalistPhone}>📞 682258144</Text>
      </View>

      <View style={styles.herbalistRow}>
        <Text style={styles.herbalistDesc}>Solution Bio, Fak, Yde</Text>
        <Text style={styles.herbalistPhone}>📞 682258144</Text>
      </View>

      <View style={styles.herbalistRow}>
        <Text style={styles.herbalistDesc}>La Boutique Du Naturel, Essi Ydé</Text>
        <Text style={styles.herbalistPhone}>📞 695125928</Text>
      </View>

      <View style={styles.herbalistRow}>
        <Text style={styles.herbalistDesc}>Les Petits Secrets de Bella, Nkom, Ydé</Text>
        <Text style={styles.herbalistPhone}>📞 670835223</Text>
      </View>

      <View style={styles.herbalistRow}>
        <Text style={styles.herbalistDesc}>Maison du Bien-être de Bonamouss, Ydé</Text>
        <Text style={styles.herbalistPhone}>📞 699822942</Text>
      </View>

      <View style={styles.herbalistRow}>
        <Text style={styles.herbalistDesc}>ONG-SANTÉ AVANT TOUT, Nkomo Ydé</Text>
        <Text style={styles.herbalistPhone}>📞 672000001</Text>
      </View>

      <TouchableOpacity style={styles.herbalistBtn} onPress={() => router.push('/herbalist')}>
        <Text style={styles.herbalistBtnText}>View more Cameroonist</Text>
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
    marginTop:40,
  },
  heroSection: {
    height: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
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
  herbalistCard: {
  marginHorizontal: 15,
  marginBottom: 20,
  padding: 15,
  borderRadius: 10,
  backgroundColor: '#F0FAF2',
  borderWidth: 1,
  borderColor: '#D6EBD6',
},

herbalistTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 12,
  color: '#006400',
},

herbalistRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 20,
  borderBottomWidth: 0.7,
  borderBottomColor: '#e6e6e6',
},

herbalistDesc: {
  fontSize: 13,
  color: '#333',
  flex: 1,
},

herbalistPhone: {
  fontSize: 13,
  color: '#1C8D3C',
  marginLeft: 10,
},

herbalistBtn: {
  backgroundColor: '#007D3A',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 6,
  marginTop: 0,
  alignSelf: 'flex-start',
  marginLeft: 70,
},

herbalistBtnText: {
  color: 'white',
  fontSize: 12,
  fontWeight: '600',
},

  heroText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '700',
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
