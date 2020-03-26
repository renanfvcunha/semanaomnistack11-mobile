import React from 'react';
import {SafeAreaView, View, Image, Text} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';

// import { Container } from './styles';

export default function Incidents() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.textBold}>0</Text> casos.
        </Text>
      </View>

      <Text style={styles.title}>Bem-Vindo(a)!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia!
      </Text>
    </SafeAreaView>
  );
}
