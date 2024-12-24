import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Animated } from 'react-native';

export default function TeamScore({ teamNames }) {
  const [scores, setScores] = useState({ teamA: 0, teamB: 0 });
  const [scaleAnimation] = useState(new Animated.Value(1));

  const handleIncrement = (team) => {
    setScores((prevScores) => {
      const newScore = prevScores[team] + 1;

      // Scale animation for feedback
      Animated.sequence([
        Animated.timing(scaleAnimation, { toValue: 1.2, duration: 150, useNativeDriver: true }),
        Animated.timing(scaleAnimation, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();

      if (newScore === 10) {
        Alert.alert('🎉 selamat!', `${team === 'teamA' ? teamNames.teamA : teamNames.teamB} menang!`);
      }
      return {
        ...prevScores,
        [team]: Math.min(newScore, 10),
      };
    });
  };

  const handleDecrement = (team) => {
    setScores((prevScores) => ({
      ...prevScores,
      [team]: Math.max(prevScores[team] - 1, 0),
    }));
  };

  const resetScores = () => {
    setScores({ teamA: 0, teamB: 0 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scoreboard</Text>
      <Team
        teamName={teamNames.teamA}
        score={scores.teamA}
        onIncrement={() => handleIncrement('teamA')}
        onDecrement={() => handleDecrement('teamA')}
        scaleAnimation={scaleAnimation}
      />
      <Team
        teamName={teamNames.teamB}
        score={scores.teamB}
        onIncrement={() => handleIncrement('teamB')}
        onDecrement={() => handleDecrement('teamB')}
        scaleAnimation={scaleAnimation}
      />
      <TouchableOpacity style={styles.resetButton} onPress={resetScores}>
        <Text style={styles.resetButtonText}>🔄 Reset Scores</Text>
      </TouchableOpacity>
    </View>
  );
}

function Team({ teamName, score, onIncrement, onDecrement, scaleAnimation }) {
  return (
    <View style={styles.teamContainer}>
      <Text style={styles.teamName}>{teamName}</Text>
      <Animated.Text style={[styles.score, { transform: [{ scale: scaleAnimation }] }]}>
        {score}
      </Animated.Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.incrementButton]} onPress={onIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.decrementButton]} onPress={onDecrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
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
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00cec9',
    marginBottom: 20,
    textShadowColor: '#d63031',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  teamContainer: {
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#6c5ce7',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  teamName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dfe6e9',
    marginBottom: 10,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffeaa7',
    marginVertical: 15,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 7,
  },
  incrementButton: {
    backgroundColor: '#00b894',
  },
  decrementButton: {
    backgroundColor: '#d63031',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#0984e3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
