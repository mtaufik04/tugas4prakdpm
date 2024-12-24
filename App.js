// App.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Parent from './components/parent';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>SKOR FUTSAL</Text>
      <Parent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
