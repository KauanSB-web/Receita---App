import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Sobre() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color="#333333"
            />
          </TouchableOpacity>

          <Text style={styles.logo}>
            Receita<Text style={styles.logoLaranja}>í</Text>
          </Text>

          <View style={styles.espaco} />
        </View>

        {/* INTRODUÇÃO */}
        <View style={styles.introducao}>
          <View style={styles.iconePrincipal}>
            <Text style={styles.emoji}>🍳</Text>
          </View>

          <Text style={styles.titulo}>
            Sobre o aplicativo
          </Text>

          <Text style={styles.subtitulo}>
            Conheça um pouco mais sobre o Receitaí.
          </Text>
        </View>

        {/* O QUE É */}
        <View style={styles.card}>
          <View style={styles.cardCabecalho}>
            <View style={styles.icone}>
              <Ionicons
                name="restaurant-outline"
                size={24}
                color="#E76518"
              />
            </View>

            <Text style={styles.cardTitulo}>
              O que é o Receitaí?
            </Text>
          </View>

          <Text style={styles.texto}>
            O Receitaí é um aplicativo desenvolvido para
            facilitar a busca por receitas e ajudar você a
            descobrir novas opções para preparar em casa.
          </Text>

          <Text style={styles.texto}>
            Aqui você pode explorar diferentes receitas,
            pesquisar por pratos, consultar ingredientes e
            acompanhar o modo de preparo de cada receita.
          </Text>
        </View>

        {/* FUNCIONALIDADES */}
        <Text style={styles.secaoTitulo}>
          O que você pode fazer
        </Text>

        <View style={styles.card}>
          <Item
            icon="search-outline"
            titulo="Explorar receitas"
            texto="Encontre receitas de diferentes categorias."
          />

          <View style={styles.linha} />

          <Item
            icon="heart-outline"
            titulo="Salvar favoritos"
            texto="Guarde suas receitas preferidas para acessar depois."
          />

          <View style={styles.linha} />

          <Item
            icon="bulb-outline"
            titulo="Aprender dicas"
            texto="Descubra truques para melhorar suas habilidades na cozinha."
          />

          <View style={styles.linha} />

          <Item
            icon="person-outline"
            titulo="Criar sua conta"
            texto="Tenha uma experiência personalizada usando sua conta."
          />
        </View>

        {/* OBJETIVO */}
        <View style={styles.destaque}>
          <View style={styles.destaqueIcone}>
            <Ionicons
              name="heart"
              size={25}
              color="#E76518"
            />
          </View>

          <Text style={styles.destaqueTitulo}>
            Feito para quem ama cozinhar
          </Text>

          <Text style={styles.destaqueTexto}>
            Nosso objetivo é tornar a experiência de
            encontrar e preparar receitas simples,
            agradável e divertida.
          </Text>
        </View>

        {/* PROJETO */}
        <View style={styles.card}>
          <View style={styles.cardCabecalho}>
            <View style={styles.icone}>
              <Ionicons
                name="school-outline"
                size={24}
                color="#E76518"
              />
            </View>

            <Text style={styles.cardTitulo}>
              Sobre o projeto
            </Text>
          </View>

          <Text style={styles.texto}>
            O Receitaí foi desenvolvido como um projeto
            acadêmico, reunindo desenvolvimento de
            aplicativos, interface mobile e integração
            com serviços de autenticação.
          </Text>

          <Text style={styles.texto}>
            O aplicativo utiliza tecnologias modernas para
            oferecer uma experiência rápida, organizada e
            fácil de usar.
          </Text>
        </View>

        {/* TECNOLOGIAS */}
        <Text style={styles.secaoTitulo}>
          Tecnologias
        </Text>

        <View style={styles.tecnologias}>
          <Tecnologia
            icon="logo-react"
            nome="React Native"
          />

          <Tecnologia
            icon="logo-firebase"
            nome="Firebase"
          />

          <Tecnologia
            icon="phone-portrait-outline"
            nome="Expo"
          />
        </View>

        {/* VERSÃO */}
        <View style={styles.versao}>
          <Text style={styles.versaoLogo}>
            Receita<Text style={styles.logoLaranja}>í</Text>
          </Text>

          <Text style={styles.versaoTexto}>
            Versão 1.0.0
          </Text>

          <Text style={styles.versaoSubtexto}>
            Sua cozinha, suas receitas ❤️
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Item({
  icon,
  titulo,
  texto,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  titulo: string;
  texto: string;
}) {
  return (
    <View style={styles.item}>
      <View style={styles.iconeItem}>
        <Ionicons
          name={icon}
          size={23}
          color="#E76518"
        />
      </View>

      <View style={styles.itemTextos}>
        <Text style={styles.itemTitulo}>
          {titulo}
        </Text>

        <Text style={styles.itemTexto}>
          {texto}
        </Text>
      </View>
    </View>
  );
}

function Tecnologia({
  icon,
  nome,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  nome: string;
}) {
  return (
    <View style={styles.tecnologia}>
      <Ionicons
        name={icon}
        size={24}
        color="#E76518"
      />

      <Text style={styles.tecnologiaTexto}>
        {nome}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },

  conteudo: {
    paddingBottom: 45,
  },

  header: {
    height: 82,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  botaoVoltar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#222222',
    letterSpacing: -1,
  },

  logoLaranja: {
    color: '#F45D01',
  },

  espaco: {
    width: 46,
  },

  introducao: {
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 28,
  },

  iconePrincipal: {
    width: 68,
    height: 68,
    borderRadius: 21,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },

  emoji: {
    fontSize: 38,
  },

  titulo: {
    fontSize: 34,
    fontWeight: '800',
    color: '#222222',
    letterSpacing: -0.7,
  },

  subtitulo: {
    fontSize: 18,
    color: '#777777',
    lineHeight: 26,
    marginTop: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 21,
    padding: 20,
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  cardCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  icone: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#FFF3EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  cardTitulo: {
    flex: 1,
    fontSize: 19,
    fontWeight: '800',
    color: '#292929',
  },

  texto: {
    fontSize: 15,
    color: '#6F6F6F',
    lineHeight: 23,
    marginTop: 3,
  },

  secaoTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2B2B2B',
    paddingHorizontal: 24,
    marginBottom: 12,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 78,
  },

  iconeItem: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#FFF3EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  itemTextos: {
    flex: 1,
  },

  itemTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#292929',
  },

  itemTexto: {
    fontSize: 13,
    color: '#858585',
    lineHeight: 18,
    marginTop: 4,
  },

  linha: {
    height: 1,
    backgroundColor: '#F1F1F1',
    marginLeft: 59,
  },

  destaque: {
    marginHorizontal: 20,
    marginBottom: 27,
    padding: 25,
    borderRadius: 22,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
  },

  destaqueIcone: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },

  destaqueTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2D2D2D',
    textAlign: 'center',
  },

  destaqueTexto: {
    fontSize: 14,
    color: '#777777',
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 8,
  },

  tecnologias: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 30,
    gap: 10,
  },

  tecnologia: {
    flex: 1,
    minHeight: 82,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  tecnologiaTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555555',
    marginTop: 7,
  },

  versao: {
    alignItems: 'center',
    paddingTop: 4,
  },

  versaoLogo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333333',
  },

  versaoTexto: {
    fontSize: 13,
    color: '#888888',
    marginTop: 5,
  },

  versaoSubtexto: {
    fontSize: 12,
    color: '#AAAAAA',
    marginTop: 4,
  },
});