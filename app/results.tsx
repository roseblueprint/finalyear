import { useLocalSearchParams } from 'expo-router';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function ResultsScreen() {
  const { drug } = useLocalSearchParams();

  // Fake data
  const pharmacies = [
    { name: 'Pharmacy Bonapriso', price: '3500 FCFA' },
    { name: 'Pharmacy Akwa', price: '3700 FCFA' },
    { name: 'Pharmacy Buea', price: '3300 FCFA' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results for: {drug}</Text>
      <FlatList
        data={pharmacies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, flex: 1 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 15 },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  name: { fontSize: 16 },
  price: { color: '#0B82DC', fontWeight: '500' },
});
