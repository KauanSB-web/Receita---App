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

const dicas = [
  {
    id: 1,
    titulo: 'Organize os ingredientes',
    texto:
      'Antes de começar a cozinhar, separe todos os ingredientes. Isso deixa o preparo mais rápido e evita esquecer algum item.',
    icone: 'basket-outline' as const,
  },
  {
    id: 2,
    titulo: 'Leia a receita inteira',
    texto:
      'Leia todos os passos antes de começar. Assim você já sabe o que precisa preparar e evita surpresas durante o cozimento.',
    icone: 'book-outline' as const,
  },
  {
    id: 3,
    titulo: 'Use uma boa faca',
    texto:
      'Uma faca bem afiada facilita o corte dos alimentos e também oferece mais segurança durante o preparo.',
    icone: 'cut-outline' as const,
  },
  {
    id: 4,
    titulo: 'Não tenha pressa',
    texto:
      'Cozinhar com calma ajuda a perceber o ponto dos alimentos e deixa o resultado muito melhor.',
    icone: 'time-outline' as const,
  },
  {
    id: 5,
    titulo: 'Experimente os temperos',
    texto:
      'Prove a comida durante o preparo e ajuste os temperos aos poucos. Assim você consegue chegar ao sabor ideal.',
    icone: 'flask-outline' as const,
  },
  {
    id: 6,
    titulo: 'Mantenha a cozinha limpa',
    texto:
      'Enquanto cozinha, tente organizar os utensílios e limpar o que não estiver mais usando. Isso facilita bastante o preparo.',
    icone: 'sparkles-outline' as const,
  },
  {
    id: 7,
    titulo: 'Aqueça a panela',
    texto:
      'Em muitos preparos, esperar a panela aquecer antes de colocar os ingredientes ajuda a obter melhores resultados.',
    icone: 'flame-outline' as const,
  },
  {
    id: 8,
    titulo: 'Guarde corretamente',
    texto:
      'Depois de preparar sua receita, espere o alimento esfriar quando necessário e armazene em recipientes adequados.',
    icone: 'cube-outline' as const,
  },
];

export default function DicasScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* CABEÇALHO */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.voltar}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Ionicons
                name="arrow-back"
                size={25}
                color="#333"
              />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
              <View style={styles.logoLinha}>
                <Text style={styles.logo}>Receitaí</Text>
                <Text style={styles.talheres}>🍴</Text>
              </View>

              <Text style={styles.logoSubtitulo}>
                Receitas feitas para você
              </Text>
            </View>

            <View style={styles.espaco} />
          </View>

          {/* TÍTULO */}
          <View style={styles.introducao}>
            <View style={styles.iconeIntroducao}>
              <Text style={styles.emojiIntroducao}>💡</Text>
            </View>

            <Text style={styles.titulo}>
              Dicas de cozinha
            </Text>

            <Text style={styles.subtitulo}>
              Pequenos truques para deixar suas receitas ainda
              mais gostosas e seu preparo muito mais fácil.
            </Text>
          </View>

          {/* DICA DO DIA */}
          <View style={styles.dicaDoDia}>
            <View style={styles.dicaDoDiaTopo}>
              <View style={styles.dicaDoDiaIcone}>
                <Text style={styles.dicaDoDiaEmoji}>⭐</Text>
              </View>

              <Text style={styles.dicaDoDiaLabel}>
                DICA DO DIA
              </Text>
            </View>

            <Text style={styles.dicaDoDiaTitulo}>
              Prove durante o preparo
            </Text>

            <Text style={styles.dicaDoDiaTexto}>
              Experimentar a receita durante o preparo ajuda
              você a ajustar sal, temperos e textura antes de
              finalizar o prato.
            </Text>
          </View>

          {/* LISTA DE DICAS */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>
              Mais dicas para você
            </Text>

            <Text style={styles.secaoSubtitulo}>
              Aprenda truques simples para cozinhar melhor.
            </Text>
          </View>

          <View style={styles.lista}>
            {dicas.map((dica, index) => (
              <View
                key={dica.id}
                style={styles.card}
              >
                <View style={styles.numero}>
                  <Text style={styles.numeroTexto}>
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                </View>

                <View style={styles.cardIcone}>
                  <Ionicons
                    name={dica.icone}
                    size={27}
                    color="#E76518"
                  />
                </View>

                <View style={styles.cardConteudo}>
                  <Text style={styles.cardTitulo}>
                    {dica.titulo}
                  </Text>

                  <Text style={styles.cardTexto}>
                    {dica.texto}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* FRASE FINAL */}
          <View style={styles.final}>
            <Text style={styles.finalEmoji}>👨‍🍳</Text>

            <Text style={styles.finalTitulo}>
              Cozinhar também é aprender!
            </Text>

            <Text style={styles.finalTexto}>
              Teste novas receitas, experimente sabores e
              aproveite cada momento na cozinha.
            </Text>
          </View>

          <View style={{ height: 35 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9F1',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFF9F1',
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
  },

  header: {
    height: 78,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  voltar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9E1DA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
  },

  logoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    fontSize: 27,
    fontWeight: '900',
    color: '#E76518',
    letterSpacing: -0.5,
  },

  talheres: {
    fontSize: 21,
    marginLeft: 6,
  },

  logoSubtitulo: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },

  espaco: {
    width: 48,
  },

  introducao: {
    alignItems: 'center',
    marginTop: 28,
  },

  iconeIntroducao: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#FFF0E4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F2D8C5',
  },

  emojiIntroducao: {
    fontSize: 40,
  },

  titulo: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '900',
    color: '#171717',
    marginTop: 18,
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 17,
    lineHeight: 25,
    color: '#777',
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 8,
  },

  dicaDoDia: {
    backgroundColor: '#F65D00',
    borderRadius: 27,
    marginTop: 32,
    padding: 24,
  },

  dicaDoDiaTopo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dicaDoDiaIcone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dicaDoDiaEmoji: {
    fontSize: 20,
  },

  dicaDoDiaLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
    marginLeft: 10,
  },

  dicaDoDiaTitulo: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
    marginTop: 17,
  },

  dicaDoDiaTexto: {
    color: '#FFF4ED',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },

  secao: {
    marginTop: 35,
    marginBottom: 17,
  },

  secaoTitulo: {
    color: '#171717',
    fontSize: 27,
    fontWeight: '900',
  },

  secaoSubtitulo: {
    color: '#888',
    fontSize: 14,
    marginTop: 5,
  },

  lista: {
    gap: 13,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E9E4DF',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  numero: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF3E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },

  numeroTexto: {
    color: '#E76518',
    fontSize: 12,
    fontWeight: '900',
  },

  cardIcone: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFF0E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  cardConteudo: {
    flex: 1,
    paddingTop: 1,
  },

  cardTitulo: {
    color: '#252525',
    fontSize: 17,
    fontWeight: '900',
  },

  cardTexto: {
    color: '#777',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },

  final: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E9E4DF',
    padding: 25,
    marginTop: 30,
  },

  finalEmoji: {
    fontSize: 42,
  },

  finalTitulo: {
    color: '#222',
    fontSize: 21,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 10,
  },

  finalTexto: {
    color: '#888',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 7,
  },
});