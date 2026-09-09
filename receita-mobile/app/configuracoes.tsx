import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Configuracoes() {
  const router = useRouter();

  const [notificacoes, setNotificacoes] = useState(true);
  const [economiaDados, setEconomiaDados] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>

          <Text style={styles.logo}>Receitaí</Text>

          <View style={styles.espaco} />
        </View>

        <View style={styles.intro}>
          <Text style={styles.titulo}>Configurações</Text>
          <Text style={styles.subtitulo}>
            Personalize sua experiência no Receitaí.
          </Text>
        </View>

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Preferências</Text>

          <View style={styles.item}>
            <View style={styles.itemEsquerda}>
              <View style={styles.iconeContainer}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color="#F45D01"
                />
              </View>

              <View style={styles.textos}>
                <Text style={styles.itemTitulo}>Notificações</Text>
                <Text style={styles.itemDescricao}>
                  Receba novidades e dicas do Receitaí.
                </Text>
              </View>
            </View>

            <Switch
              value={notificacoes}
              onValueChange={setNotificacoes}
              trackColor={{
                false: '#DDDDDD',
                true: '#FFB27A',
              }}
              thumbColor={notificacoes ? '#F45D01' : '#F4F4F4'}
            />
          </View>

          <View style={styles.item}>
            <View style={styles.itemEsquerda}>
              <View style={styles.iconeContainer}>
                <Ionicons
                  name="cellular-outline"
                  size={22}
                  color="#F45D01"
                />
              </View>

              <View style={styles.textos}>
                <Text style={styles.itemTitulo}>Economia de dados</Text>
                <Text style={styles.itemDescricao}>
                  Reduza o uso de dados ao carregar imagens.
                </Text>
              </View>
            </View>

            <Switch
              value={economiaDados}
              onValueChange={setEconomiaDados}
              trackColor={{
                false: '#DDDDDD',
                true: '#FFB27A',
              }}
              thumbColor={economiaDados ? '#F45D01' : '#F4F4F4'}
            />
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Aplicativo</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/sobre')}
            activeOpacity={0.7}
          >
            <View style={styles.menuEsquerda}>
              <View style={styles.iconeContainer}>
                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color="#F45D01"
                />
              </View>

              <View style={styles.textos}>
                <Text style={styles.itemTitulo}>Sobre o aplicativo</Text>
                <Text style={styles.itemDescricao}>
                  Conheça mais sobre o Receitaí.
                </Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#999999"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/privacidade')}
            activeOpacity={0.7}
          >
            <View style={styles.menuEsquerda}>
              <View style={styles.iconeContainer}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={22}
                  color="#F45D01"
                />
              </View>

              <View style={styles.textos}>
                <Text style={styles.itemTitulo}>Privacidade</Text>
                <Text style={styles.itemDescricao}>
                  Veja como seus dados são utilizados.
                </Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#999999"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.versao}>
          <Text style={styles.versaoTexto}>Receitaí</Text>
          <Text style={styles.versaoNumero}>Versão 1.0.0</Text>
        </View>

        <View style={styles.cardFinal}>
          <Text style={styles.cardEmoji}>🍳</Text>

          <Text style={styles.cardTitulo}>
            Cozinhar fica melhor quando tudo está do seu jeito.
          </Text>

          <Text style={styles.cardTexto}>
            Ajuste suas preferências e aproveite o Receitaí!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },

  conteudo: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  botaoVoltar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    fontSize: 27,
    fontWeight: '900',
    color: '#F45D01',
    letterSpacing: -1,
  },

  espaco: {
    width: 44,
  },

  intro: {
    marginTop: 18,
    marginBottom: 30,
  },

  titulo: {
    fontSize: 34,
    fontWeight: '900',
    color: '#222222',
    letterSpacing: -1,
  },

  subtitulo: {
    marginTop: 8,
    fontSize: 17,
    lineHeight: 24,
    color: '#777777',
  },

  secao: {
    marginBottom: 28,
  },

  tituloSecao: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333333',
    marginBottom: 12,
  },

  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  itemEsquerda: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },

  iconeContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  textos: {
    flex: 1,
  },

  itemTitulo: {
    fontSize: 16,
    fontWeight: '800',
    color: '#333333',
  },

  itemDescricao: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
    color: '#888888',
  },

  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  menuEsquerda: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },

  versao: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 24,
  },

  versaoTexto: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F45D01',
  },

  versaoNumero: {
    marginTop: 4,
    fontSize: 13,
    color: '#999999',
  },

  cardFinal: {
    backgroundColor: '#F45D01',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },

  cardEmoji: {
    fontSize: 34,
    marginBottom: 12,
  },

  cardTitulo: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  cardTexto: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#FFF4EC',
    textAlign: 'center',
  },
});