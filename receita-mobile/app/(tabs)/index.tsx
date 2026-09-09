import React, { useMemo, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import receitas from '../../data/receitas';

const categorias = [
  { nome: 'Todas', emoji: '✨' },
  { nome: 'Massas', emoji: '🍝' },
  { nome: 'Sobremesas', emoji: '🍰' },
  { nome: 'Saudável', emoji: '🥗' },
  { nome: 'Lanches', emoji: '🥪' },
  { nome: 'Almoço', emoji: '🍛' },
  { nome: 'Café da manhã', emoji: '☕' },
];

export default function HomeScreen() {
  const router = useRouter();

  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState('Todas');

  const receitasFiltradas = useMemo(() => {
    const texto = busca.trim().toLowerCase();

    return receitas.filter((receita) => {
      const combinaCategoria =
        categoriaSelecionada === 'Todas' ||
        receita.categoria === categoriaSelecionada;

      const combinaBusca =
        texto.length === 0 ||
        receita.nome.toLowerCase().includes(texto) ||
        receita.categoria.toLowerCase().includes(texto);

      return combinaCategoria && combinaBusca;
    });
  }, [busca, categoriaSelecionada]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* CABEÇALHO */}
          <View style={styles.header}>
            <View>
              <View style={styles.logoLinha}>
                <Text style={styles.logo}>Receitaí</Text>
                <Text style={styles.talheres}>🍴</Text>
              </View>

              <Text style={styles.headerSubtitulo}>
                Receitas feitas para você
              </Text>
            </View>

            <TouchableOpacity
              style={styles.perfil}
              onPress={() => router.push('/modal')}
              activeOpacity={0.8}
            >
              <Ionicons
                name="person-outline"
                size={34}
                color="#E76518"
              />
            </TouchableOpacity>
          </View>

          {/* SAUDAÇÃO */}
          <View style={styles.saudacao}>
            <Text style={styles.ola}>
              Olá! <Text style={styles.mao}>👋</Text>
            </Text>

            <Text style={styles.titulo}>
              O que vamos{'\n'}cozinhar hoje?
            </Text>

            <Text style={styles.subtitulo}>
              Encontre receitas deliciosas e{'\n'}
              fáceis de preparar.
            </Text>
          </View>

          {/* BUSCA */}
          <View style={styles.buscaContainer}>
            <Ionicons
              name="search-outline"
              size={32}
              color="#999"
            />

            <TextInput
              value={busca}
              onChangeText={setBusca}
              placeholder="Buscar receitas..."
              placeholderTextColor="#999"
              style={styles.input}
              returnKeyType="search"
            />

            {busca.length > 0 && (
              <TouchableOpacity
                onPress={() => setBusca('')}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="close-circle"
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            )}
          </View>

          {/* CATEGORIAS */}
          <View style={styles.secaoCabecalho}>
            <Text style={styles.secaoTitulo}>Categorias</Text>

            <TouchableOpacity
              onPress={() => {
                setCategoriaSelecionada('Todas');
                setBusca('');
              }}
            >
              <Text style={styles.verTodas}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categorias}
          >
            {categorias.map((categoria) => {
              const selecionada =
                categoriaSelecionada === categoria.nome;

              return (
                <TouchableOpacity
                  key={categoria.nome}
                  style={[
                    styles.categoriaCard,
                    selecionada && styles.categoriaSelecionada,
                  ]}
                  onPress={() =>
                    setCategoriaSelecionada(categoria.nome)
                  }
                  activeOpacity={0.8}
                >
                  <Text style={styles.categoriaEmoji}>
                    {categoria.emoji}
                  </Text>

                  <Text
                    style={[
                      styles.categoriaNome,
                      selecionada &&
                        styles.categoriaNomeSelecionada,
                    ]}
                  >
                    {categoria.nome}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* RECEITAS */}
          <View style={styles.receitasCabecalho}>
            <View>
              <Text style={styles.secaoTitulo}>
                Receitas para você
              </Text>

              <Text style={styles.contador}>
                {receitasFiltradas.length}{' '}
                {receitasFiltradas.length === 1
                  ? 'receita encontrada'
                  : 'receitas encontradas'}
              </Text>
            </View>
          </View>

          {receitasFiltradas.length === 0 ? (
            <View style={styles.semResultado}>
              <Text style={styles.semResultadoEmoji}>🔎</Text>

              <Text style={styles.semResultadoTitulo}>
                Nenhuma receita encontrada
              </Text>

              <Text style={styles.semResultadoTexto}>
                Tente buscar outro prato ou categoria.
              </Text>

              <TouchableOpacity
                style={styles.limparBusca}
                onPress={() => {
                  setBusca('');
                  setCategoriaSelecionada('Todas');
                }}
              >
                <Text style={styles.limparBuscaTexto}>
                  Limpar filtros
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            receitasFiltradas.map((receita) => (
              <TouchableOpacity
                key={receita.id}
                style={styles.receitaCard}
                onPress={() =>
                  router.push({
                    pathname: '/[id]',
                    params: {
                      id: String(receita.id),
                    },
                  })
                }
                activeOpacity={0.85}
              >
                <Image
                  source={{ uri: receita.imagem }}
                  style={styles.receitaImagem}
                  resizeMode="cover"
                />

                <View style={styles.receitaInfo}>
                  <Text
                    style={styles.receitaNome}
                    numberOfLines={2}
                  >
                    {receita.nome}
                  </Text>

                  <Text style={styles.receitaCategoria}>
                    {receita.categoria}
                  </Text>

                  <View style={styles.tempo}>
                    <Ionicons
                      name="time-outline"
                      size={17}
                      color="#888"
                    />

                    <Text style={styles.tempoTexto}>
                      {receita.tempo}
                    </Text>

                    <Text style={styles.separador}>•</Text>

                    <Text style={styles.dificuldade}>
                      {receita.dificuldade}
                    </Text>
                  </View>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color="#C8C8C8"
                />
              </TouchableOpacity>
            ))
          )}

          <View style={{ height: 30 }} />
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
    paddingBottom: 90,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 38,
  },

  logoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    fontSize: 42,
    fontWeight: '800',
    color: '#E76518',
    letterSpacing: -1,
  },

  talheres: {
    fontSize: 32,
    marginLeft: 12,
  },

  headerSubtitulo: {
    fontSize: 19,
    color: '#777',
    marginTop: 4,
  },

  perfil: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1.5,
    borderColor: '#E9D5C2',
    backgroundColor: '#FFF4E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  saudacao: {
    marginBottom: 30,
  },

  ola: {
    fontSize: 52,
    lineHeight: 58,
    fontWeight: '800',
    color: '#171717',
    marginBottom: 10,
  },

  mao: {
    fontSize: 48,
  },

  titulo: {
    fontSize: 43,
    lineHeight: 48,
    fontWeight: '800',
    color: '#171717',
    letterSpacing: -1,
  },

  subtitulo: {
    fontSize: 25,
    lineHeight: 34,
    color: '#777',
    marginTop: 24,
  },

  buscaContainer: {
    height: 86,
    borderRadius: 28,
    backgroundColor: '#F1F1F1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 42,
  },

  input: {
    flex: 1,
    fontSize: 25,
    color: '#333',
    marginLeft: 15,
  },

  secaoCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  secaoTitulo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#171717',
  },

  verTodas: {
    fontSize: 19,
    fontWeight: '700',
    color: '#D85C14',
  },

  categorias: {
    paddingBottom: 12,
    gap: 14,
  },

  categoriaCard: {
    width: 155,
    height: 150,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },

  categoriaSelecionada: {
    backgroundColor: '#F65D00',
    borderColor: '#F65D00',
  },

  categoriaEmoji: {
    fontSize: 48,
    marginBottom: 14,
  },

  categoriaNome: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5B5B5B',
    textAlign: 'center',
  },

  categoriaNomeSelecionada: {
    color: '#FFFFFF',
  },

  receitasCabecalho: {
    marginTop: 32,
    marginBottom: 18,
  },

  contador: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },

  receitaCard: {
    minHeight: 105,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    marginBottom: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9E9E9',
  },

  receitaImagem: {
    width: 82,
    height: 82,
    borderRadius: 18,
    backgroundColor: '#FFF0E4',
  },

  receitaInfo: {
    flex: 1,
    marginLeft: 15,
    marginRight: 8,
  },

  receitaNome: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222',
  },

  receitaCategoria: {
    fontSize: 14,
    color: '#E76518',
    fontWeight: '600',
    marginTop: 4,
  },

  tempo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  tempoTexto: {
    color: '#888',
    fontSize: 13,
    marginLeft: 5,
  },

  separador: {
    color: '#BBBBBB',
    fontSize: 13,
    marginHorizontal: 6,
  },

  dificuldade: {
    color: '#888',
    fontSize: 13,
  },

  semResultado: {
    alignItems: 'center',
    paddingVertical: 40,
  },

  semResultadoEmoji: {
    fontSize: 45,
  },

  semResultadoTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
    marginTop: 12,
    textAlign: 'center',
  },

  semResultadoTexto: {
    fontSize: 15,
    color: '#888',
    marginTop: 6,
    textAlign: 'center',
  },

  limparBusca: {
    marginTop: 20,
    backgroundColor: '#F65D00',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 18,
  },

  limparBuscaTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
