import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PharmacyTownsScreen() {
  const router = useRouter();

  const regions = [
    { title: 'South-West Region', towns: ['Buea', 'Limbe', 'Tiko', 'Kumba', 'Manfe'] },
    { title: 'Littoral Region', towns: ['Douala', 'Bonaberi', 'Nkongsamba', 'Manjo', 'Mbanga'] },
    { title: 'West Region', towns: ['Bafoussam', 'Dschang', 'Mbouda', 'Foumban', 'Bangangté'] },
    { title: 'Adamawa Region', towns: ['Ngaoundéré', 'Tibati', 'Meiganga', 'Tignère', 'Banyo'] },
    { title: 'Central Region', towns: ['Yaoundé', 'Obala', 'Mbalmayo', 'Bafia', 'Akono'] },
    { title: 'East Region', towns: ['Bertoua', 'Batouri', 'Abong-Mbang', 'Yokadouma', 'Lomié'] },
    { title: 'Far North Region', towns: ['Maroua', 'Kousséri', 'Mokolo', 'Mora', 'Yagoua'] },
    { title: 'North Region', towns: ['Garoua', 'Guider', 'Poli', 'Rey Bouba', 'Pitoa'] },
    { title: 'North-West Region', towns: ['Bamenda', 'Kumbo', 'Ndop', 'Wum', 'Nkambe'] },
    { title: 'South Region', towns: ['Ebolowa', 'Kribi', 'Sangmélima', 'Meyomessala', 'Djoum'] },
  ];

  const chunkArray = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const regionChunks = chunkArray(regions, 4);

  return (
    <ScrollView style={styles.container}>
    
      {/* <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo1.png')}
        style={styles.image}
      />
    </View> */}


      {/* 📝 Texte entre image et régions */}
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Select a Town</Text>
      </View>

      {/* 🧭 Région scrollable horizontalement */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {regionChunks.map((chunk, chunkIndex) => (
          <View key={chunkIndex} style={styles.column}>
            {chunk.map((region, index) => (
              <View key={index} style={styles.regionContainer}>
                <Text style={styles.regionTitle}>{region.title}</Text>
                {region.towns.map((town, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.townRow}
                    onPress={() => router.push('/allpharmacy')}
                  >
                    <Ionicons name="eye-outline" size={14} color="#0B82DC" />
                    <Text style={styles.townText}>{town}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topImage: {
    width: '100%',
    height: 180,
  },
  headerTextContainer: {
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B82DC',
  },
  horizontalScroll: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  column: {
    width: 250,
    marginRight: 15,
  },
  regionContainer: {
    marginBottom: 30,
  },
  regionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginBottom: 8,
  },
  townRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  townText: {
    marginLeft: 6,
    color: '#0B82DC',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});