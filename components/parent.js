import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TeamScore from './skor';

export default function Parent() {
  const teamNames = {
    teamA: 'Team A',
    teamB: 'Team B',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.matchTitle}>{teamNames.teamA} 🆚 {teamNames.teamB}</Text>
      <TeamScore teamNames={teamNames} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3436',
    padding: 20,
  },
  matchTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#dfe6e9',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#00cec9',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
