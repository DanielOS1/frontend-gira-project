import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Progress from 'react-native-progress';

const LoadingScreen = () => (
  <View style={styles.container}>
    <Progress.Bar progress={0.5} width={200} color="red" />
    <Text style={styles.text}>Cargando...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#FFF',
    marginTop: 20,
  },
});

export default LoadingScreen;
