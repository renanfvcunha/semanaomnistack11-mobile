import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();

  function sendMail() {
    Linking.openURL(
      'mailto:ajude@apipa.com?subject=Cadelinha Atropelada&body=Gostaria de ajudar eça cadelãña que foi atropelada.',
    );
  }

  function sendWhatsApp() {
    Linking.openURL(
      'whatsapp://send?phone=+5586988209861&text=Gostaria de ajudar eça cadelãña que foi atropelada.',
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>
        <Image source={logoImg} />
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, styles.incidentProperty1st]}>
          ONG:
        </Text>
        <Text style={styles.incidentValue}>APIPA</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>Cachorro atropelado</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>R$ 120,00</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói dese caso.</Text>

        <Text style={styles.heroDescription}>Entre em Contato.</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
