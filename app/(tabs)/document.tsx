import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import * as Linking from 'expo-linking';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

const documents = [
  {
    title: 'Cameroon National Essential Medicines List 2022',
    file: require('../../assets/documents/cameroon-neml-2022.pdf'),
  },
  {
    title: 'Guide d’homologation des produits pharmaceutiques (29 Juin 2023)',
    file: require('../../assets/documents/Guide-d_homologation-des-produits-pharmaceutiques-29_06_2023.pdf'),
  },
  {
    title: 'Guide: Writing Final Year Project Reports (March 2025)',
    file:  require('../../assets/documents/Guidelines for writing Final year  Project Reports_March 2025.pdf'),
  },
  {
    title: 'Medical Law in Cameroon',
    file: require('../../assets/documents/law-medecine.pdf'),  },
  {
    title: 'Politique pharmaceutique nationale Cameroun',
    fileName:  require('../../assets/documents/Politique-pharmaceutique-nationale-Cameroun_PPN.pdf'),
  },
];

export default function DocumentsScreen() {
  const [downloading, setDownloading] = useState<string | null>(null);

 const openDocument = async (file: any) => {
  try {
    const asset = Asset.fromModule(file);
    await asset.downloadAsync();

    const uri = asset.localUri || asset.uri;

    const isAvailable = await Sharing.isAvailableAsync();

    if (isAvailable) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert('Erreur', 'Impossible d’ouvrir ce document automatiquement. Téléchargez-le manuellement.');
    }
  } catch (err: any) {
    Alert.alert('Erreur', err.message || 'Erreur inconnue');
  }
};

  const downloadDocument = async (file: any) => {
    try {
      const asset = Asset.fromModule(file);
      await asset.downloadAsync();

      const uri = asset.localUri || asset.uri;
      const isAvailable = await Sharing.isAvailableAsync();

      if (isAvailable) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Info', `Document sauvegardé localement : ${uri}`);
      }
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Erreur lors du téléchargement');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📘 Documents PDF disponibles</Text>

      {documents.map((doc, idx) => (
        <TouchableOpacity key={idx} onPress={() => openDocument(doc.file)}>
          <View style={styles.card}>
            <Image
              source={require('../../assets/images/pdf-thumbnail.png')}
              style={styles.icon}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{doc.title}</Text>
              <Text style={styles.cardSubtitle}>Touchez pour ouvrir le PDF</Text>
            </View>

            <TouchableOpacity onPress={() => downloadDocument(doc.file)}>
              <Ionicons
                name="download-outline"
                size={24}
                color="#0B82DC"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f4f7fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderColor: '#dde5f2',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
  },
});