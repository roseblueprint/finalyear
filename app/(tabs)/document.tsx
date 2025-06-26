import React ,{ useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';

const documents = [
  {
    name: 'Cameroon National Essential Medicines List 2022',
    fileName: 'cameroon-neml-2022.pdf',
  },
  {
    name: 'Guide d’homologation des produits pharmaceutiques (29 Juin 2023)',
    fileName: 'Guide-d_homologation-des-produits-pharmaceutiques-29_06_2023.pdf',
  },
  {
    name: 'Guide: Writing Final Year Project Reports (March 2025)',
    fileName: 'Guidelines for writing Final year  Project Reports_March 2025.pdf',
  },
  {
    name: 'Medical Law in Cameroon',
    fileName: 'law-medecine.pdf',
  },
  {
    name: 'Politique pharmaceutique nationale Cameroun',
    fileName: 'Politique-pharmaceutique-nationale-Cameroun_PPN.pdf',
  },
];

export default function DocumentsScreen() {
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);

  const openDocument = async (fileName: string) => {
  try {
    const assetUri = FileSystem.bundleDirectory + 'assets/documents/' + fileName;
    const destUri = FileSystem.documentDirectory + fileName;

    await FileSystem.copyAsync({ from: assetUri, to: destUri });

    await Linking.openURL(destUri);
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Error', 'Could not open document: ' + error.message);
    } else {
      Alert.alert('Error', 'Could not open document: Unknown error occurred');
    }
  }
};

const downloadDocument = async (title: string, fileName: string) => {
  try {
    const assetUri = FileSystem.bundleDirectory + 'assets/documents/' + fileName;
    const destUri = FileSystem.documentDirectory + fileName;

    await FileSystem.copyAsync({ from: assetUri, to: destUri });

    const isShareAvailable = await Sharing.isAvailableAsync();

    if (isShareAvailable) {
      await Sharing.shareAsync(destUri);
    } else {
      Alert.alert('Saved', `Document saved at: ${destUri}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Error', 'Could not download document: ' + error.message);
    } else {
      Alert.alert('Error', 'Could not download document: Unknown error occurred');
    }
  }
};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Discover what the Cameroon Law says about Pharmacies and drugs
      </Text>

      <View style={styles.sortRow}>
        <Text style={styles.sortLeft}>All legal documents</Text>
        <Text style={styles.sortRight}>Sort by ▼</Text>
      </View>

      {documents.map((doc, index) => (
        <TouchableOpacity key={index} onPress={() => openDocument(doc.fileName)}>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Image
                source={require('../../assets/images/pdf-thumbnail.png')}
                style={styles.thumbnail}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.cardTitle}>{doc.name}</Text>
                <Text style={styles.cardDescription}>
                  Tap to open this document about Cameroon pharmaceutical laws and guides.
                </Text>
              </View>
              <TouchableOpacity
              onPress={() => downloadDocument(doc.name, doc.fileName)}
              disabled={downloadingDoc === doc.fileName}
            >
              <Ionicons
                name={
                  downloadingDoc === doc.fileName
                    ? 'checkmark-done-circle-outline'
                    : 'download-outline'
                }
                size={22}
                color={downloadingDoc === doc.fileName ? '#4CAF50' : '#0B82DC'}
              />
            </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.footerTitle}>Visit some Cameroon legal websites</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 20,
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sortLeft: {
    fontSize: 13,
    fontWeight: '600',
  },
  sortRight: {
    fontSize: 13,
    color: '#555',
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 4,
    resizeMode: 'contain',
  },
  downloadIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: '#555',
  },
  footerTitle: {
    marginTop: 25,
    fontWeight: '600',
    fontSize: 13,
  },
});
