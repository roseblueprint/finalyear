import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const allDrugs = ['Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Cough Syrup', 'Vitamin C'];

export default function DrugSearchScreen() {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const router = useRouter();

  const handleInput = (text: string) => {
    setQuery(text);
    const matches = allDrugs.filter(drug => drug.toLowerCase().includes(text.toLowerCase()));
    setFilteredSuggestions(matches);
  };

  const handleSearch = (drug: string) => {
    router.push({ pathname: '/results', params: { drug } });
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <TouchableOpacity onPress={() => router.back()} style={styles.backRow}>
        <Ionicons name="arrow-back" size={20} color="black" />
        <Text style={styles.breadcrumb}>Home / Search</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Search for a drug..."
        value={query}
        onChangeText={handleInput}
        onSubmitEditing={() => handleSearch(query)}
        style={styles.searchBar}
      />

      {filteredSuggestions.map((suggestion, index) => (
        <TouchableOpacity key={index} onPress={() => handleSearch(suggestion)}>
          <Text style={styles.suggestion}>{suggestion}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff', marginTop: 30 },
  backRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  breadcrumb: { marginLeft: 6, color: '#0B82DC', fontSize: 13 },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  suggestion: { fontSize: 14, paddingVertical: 5, color: '#333' },
});