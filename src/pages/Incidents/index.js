import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();

  async function loadIncidents() {
    const response = await api.get('incidents');

    setIncidents([response.data]);
    setTotal(response.headers['x-total-count']);
  }

  async function loadMoreIncidents() {
    setLoading(true);

    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    const response = await api.get('incidents', {
      params: {page},
    });

    setIncidents([...incidents, ...response.data]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.textBold}>{total}</Text> casos.
        </Text>
      </View>

      <Text style={styles.title}>Bem-Vindo(a)!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia!
      </Text>

      <FlatList
        data={incidents}
        style={styles.incidentsList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={true}
        onEndReached={loadMoreIncidents}
        onEndReachedThreshold={0}
        renderItem={({item}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{item.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{item.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(item.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => nav.navigate('Detail', {incident: item})}>
              <Text style={styles.detailsButtonText}>Ver Mais Detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
