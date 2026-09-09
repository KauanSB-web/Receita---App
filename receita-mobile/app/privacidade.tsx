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

export default function Privacidade() {
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
            <Ionicons
              name="shield-checkmark"
              size={34}
              color="#E76518"
            />
          </View>

          <Text style={styles.titulo}>
            Privacidade
          </Text>

          <Text style={styles.subtitulo}>
            Entenda como suas informações são tratadas
            no Receitaí.
          </Text>
        </View>

        {/* RESUMO */}
        <View style={styles.destaque}>
          <View style={styles.destaqueIcone}>
            <Ionicons
              name="lock-closed"
              size={25}
              color="#E76518"
            />
          </View>

          <Text style={styles.destaqueTitulo}>
            Sua privacidade é importante
          </Text>

          <Text style={styles.destaqueTexto}>
            O Receitaí foi desenvolvido para oferecer uma
            experiência simples e segura, respeitando suas
            informações.
          </Text>
        </View>

        {/* CONTA */}
        <View style={styles.card}>
          <View style={styles.cardCabecalho}>
            <View style={styles.icone}>
              <Ionicons
                name="person-outline"
                size={24}
                color="#E76518"
              />
            </View>

            <Text style={styles.cardTitulo}>
              Dados da sua conta
            </Text>
          </View>

          <Text style={styles.texto}>
            Quando você cria uma conta no Receitaí, algumas
            informações são utilizadas para permitir o
            funcionamento da autenticação.
          </Text>

          <Text style={styles.texto}>
            O cadastro utiliza e-mail e senha. Quando
            disponível, o nome informado também pode ser
            associado ao seu perfil.
          </Text>
        </View>

        {/* FIREBASE */}
        <View style={styles.card}>
          <View style={styles.cardCabecalho}>
            <View style={styles.icone}>
              <Ionicons
                name="flame-outline"
                size={24}
                color="#E76518"
              />
            </View>

            <Text style={styles.cardTitulo}>
              Autenticação segura
            </Text>
          </View>

          <Text style={styles.texto}>
            A autenticação das contas do Receitaí é realizada
            por meio do Firebase Authentication.
          </Text>

          <Text style={styles.texto}>
            Isso permite que o aplicativo gerencie o acesso
            às contas sem precisar armazenar senhas
            diretamente no aplicativo.
          </Text>
        </View>

        {/* FAVORITOS */}
        <View style={styles.card}>
          <View style={styles.cardCabecalho}>
            <View style={styles.icone}>
              <Ionicons
                name="heart-outline"
                size={24}
                color="#E76518"
              />
            </View>

            <Text style={styles.cardTitulo}>
              Receitas favoritas
            </Text>
          </View>

          <Text style={styles.texto}>
            As receitas que você marca como favoritas são
            armazenadas localmente no dispositivo para que
            possam continuar disponíveis quando você voltar
            ao aplicativo.
          </Text>

          <Text style={styles.texto}>
            Você pode remover uma receita dos favoritos a
            qualquer momento.
          </Text>
        </View>

        {/* INFORMAÇÕES */}
        <Text style={styles.secaoTitulo}>
          Informações importantes
        </Text>

        <View style={styles.card}>
          <InfoItem
            icon="checkmark-circle-outline"
            titulo="Você controla seus favoritos"
            texto="Adicione ou remova receitas da sua lista quando quiser."
          />

          <View style={styles.linha} />

          <InfoItem
            icon="lock-closed-outline"
            titulo="Senhas protegidas"
            texto="O aplicativo não exibe nem armazena sua senha em texto aberto."
          />

          <View style={styles.linha} />

          <InfoItem
            icon="phone-portrait-outline"
            titulo="Armazenamento local"
            texto="Algumas preferências podem permanecer salvas no seu dispositivo."
          />

          <View style={styles.linha} />

          <InfoItem
            icon="shield-outline"
            titulo="Uso responsável"
            texto="As informações são utilizadas para permitir o funcionamento dos recursos do aplicativo."
          />
        </View>

        {/* SEGURANÇA */}
        <View style={styles.seguranca}>
          <View style={styles.segurancaIcone}>
            <Ionicons
              name="shield-checkmark-outline"
              size={28}
              color="#E76518"
            />
          </View>

          <Text style={styles.segurancaTitulo}>
            Segurança
          </Text>

          <Text style={styles.segurancaTexto}>
            Recomendamos que você mantenha sua senha em
            segurança e nunca compartilhe seus dados de
            acesso com outras pessoas.
          </Text>
        </View>

        {/* FINAL */}
        <View style={styles.final}>
          <Text style={styles.finalLogo}>
            Receita<Text style={styles.logoLaranja}>í</Text>
          </Text>

          <Text style={styles.finalTexto}>
            Cozinhe tranquilo. ❤️
          </Text>

          <Text style={styles.finalSubtexto}>
            Privacidade e segurança fazem parte da nossa
            experiência.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoItem({
  icon,
  titulo,
  texto,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  titulo: string;
  texto: string;
}) {
  return (
    <View style={styles.infoItem}>
      <View style={styles.infoIcone}>
        <Ionicons
          name={icon}
          size={23}
          color="#E76518"
        />
      </View>

      <View style={styles.infoTextos}>
        <Text style={styles.infoTitulo}>
          {titulo}
        </Text>

        <Text style={styles.infoTexto}>
          {texto}
        </Text>
      </View>
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

  titulo: {
    fontSize: 36,
    fontWeight: '800',
    color: '#222222',
    letterSpacing: -0.8,
  },

  subtitulo: {
    fontSize: 18,
    color: '#777777',
    lineHeight: 26,
    marginTop: 8,
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

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 82,
  },

  infoIcone: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#FFF3EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  infoTextos: {
    flex: 1,
  },

  infoTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#292929',
  },

  infoTexto: {
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

  seguranca: {
    marginHorizontal: 20,
    marginBottom: 28,
    padding: 25,
    borderRadius: 22,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
  },

  segurancaIcone: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },

  segurancaTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2D2D2D',
  },

  segurancaTexto: {
    fontSize: 14,
    color: '#777777',
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 8,
  },

  final: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 5,
  },

  finalLogo: {
    fontSize: 25,
    fontWeight: '800',
    color: '#333333',
  },

  finalTexto: {
    fontSize: 14,
    fontWeight: '700',
    color: '#777777',
    marginTop: 6,
  },

  finalSubtexto: {
    fontSize: 12,
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 4,
  },
});