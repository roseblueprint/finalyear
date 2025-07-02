import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const herbalists = [
  {
    name: 'Solution d’AFRIQUE',
    city: 'Douala',
    time: 'Monday to Saturday | 7am - 7pm',
    phone: '671-584-233',
    image: require('../assets/images/herb1.png'),
    rating: 4.3,
  },
  {
    name: 'Les Petits Secrets de Bella',
    city: 'Douala',
    time: 'Monday to Saturday | 9am - 7pm',
    phone: '671-584-233',
    image: require('../assets/images/herb2.png'),
    rating: 4.2,
  },
  {
    name: 'La Boutique Du Naturopathe',
    city: 'Douala',
    time: 'Monday to Saturday | 9am - 3pm',
    phone: '671-584-233',
    image: require('../assets/images/herb3.png'),
    rating: 4.3,
  },
  {
    name: 'Vision Santé',
    city: 'Bandjoun',
    time: 'Monday to Saturday | 8am - 3pm',
    phone: '671-584-233',
    image: require('../assets/images/herb4.png'),
    rating: 4.2,
  },
  {
    name: 'Secrets des plantes bonateki',
    city: 'Douala',
    time: 'Monday to Saturday | 8am - 3pm',
    phone: '671-584-233',
    image: require('../assets/images/herb5.png'),
    rating: 4.2,
  },
  {
    name: 'KEMA BIO Nature YAOUNDE',
    city: 'Yaoundé',
    time: 'Monday to Saturday | 8am - 3pm',
    phone: '671-584-233',
    image: require('../assets/images/herb6.png'),
    rating: 4.2,
  },
];

export default function HerbalistScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>South-West</Text>
      <Image
        source={require('../assets/images/banner-herbal.png')}
        style={styles.banner}
        resizeMode="cover"
      />

      {herbalists.map((herb, index) => (
        <View key={index} style={styles.card}>
          <Image source={herb.image} style={styles.logo} />

          <View style={styles.infoBox}>
            <Text style={styles.name}>{herb.name}</Text>

            <View style={styles.row}><Ionicons name="location" size={12} color="#0B82DC" />
              <Text style={styles.text}>{herb.city}</Text>
            </View>

            <View style={styles.row}><Ionicons name="time-outline" size={12} color="#0B82DC" />
              <Text style={styles.text}>{herb.time}</Text>
            </View>

            <View style={styles.row}><Ionicons name="call-outline" size={12} color="#0B82DC" />
              <Text style={styles.text}>{herb.phone}</Text>
            </View>
          </View>

          <View style={styles.rightBox}>
            <Text style={styles.rating}>{'⭐'.repeat(Math.round(herb.rating))}</Text>
            <Text style={styles.review}>{herb.rating} Reviews</Text>
            <TouchableOpacity>
              <Text style={styles.catalog}>View Catalog</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
  },
  banner: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 15,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#dce6f0',
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#f8faff',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  infoBox: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
  },
  text: {
    fontSize: 12,
    marginLeft: 5,
    color: '#333',
  },
  rightBox: {
    alignItems: 'flex-end',
  },
  rating: {
    fontSize: 12,
    color: '#ffc107',
    fontWeight: '600',
  },
  review: {
    fontSize: 11,
    color: '#888',
    marginBottom: 4,
  },
  catalog: {
    fontSize: 12,
    color: '#0B82DC',
    fontWeight: '600',
  },
});
