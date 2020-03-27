import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import {useNavigation, useRoute} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
  const nav = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;

  const body = `Olá, ${incident.name}.

Estou entrando em contato pois gostaria de ajudar no caso "${
    incident.title
  }" com o valor de ${Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(incident.value)}.`;

  function sendMail() {
    const to = incident.email;
    const subject = `Herói do Caso: ${incident.title}`;

    Linking.openURL(`mailto:${to}?subject=${subject}&body=${body}`);
  }

  function sendWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=+55${incident.whatsapp}&text=${body}`,
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>
        <Image source={logoImg} />
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, styles.incidentProperty1st]}>
          ONG:
        </Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city} / {incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

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
