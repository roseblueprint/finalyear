// app/search/SearchDrugScreen.tsx
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function SearchDrugScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) {
      return Alert.alert('Error', 'Please enter a drug name');
    }

    router.push({
      pathname: '/search/DrugResultScreen',
      params: { query },
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter drug name"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
});
