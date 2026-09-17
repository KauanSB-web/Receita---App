import React, { useEffect, useMemo, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from '../../firebase';
import receitas from '../../data/receitas';

const AVATAR_KEY_PREFIX = '@receitai_avatar_';
const AVATAR_VISITANTE_KEY = '@receitai_avatar_visitante';

const categorias = [
  { nome: 'Todas', emoji: '✨' },
  { nome: 'Massas', emoji: '🍝' },
  { nome: 'Sobremesas', emoji: '🍰' },
  { nome: 'Saudável', emoji: '🥗' },
  { nome: 'Lanches', emoji: '🥪' },
  { nome: 'Almoço', emoji: '🍛' },
  { nome: 'Café da manhã', emoji: '☕' },
];

function obterChaveAvatar(usuario: User | null): string {
  if (usuario?.uid) {
    return `${AVATAR_KEY_PREFIX}${usuario.uid}`;
  }

  return AVATAR_VISITANTE_KEY;
}

function avatarEhImagem(avatarAtual: string): boolean {
  return (
    avatarAtual.startsWith('file://') ||
    avatarAtual.startsWith('content://') ||
    avatarAtual.startsWith('ph://') ||
    avatarAtual.startsWith('assets-library://')
  );
}

export default function HomeScreen() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<User | null>(null);
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');
  const [avatar, setAvatar] = useState('👨‍🍳');

  useEffect(() => {
    const cancelarObservacao = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return cancelarObservacao;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let ativo = true;

      async function carregarAvatar() {
        try {
          const salvo = await AsyncStorage.getItem(
            obterChaveAvatar(usuario)
          );

          if (!ativo) {
            return;
          }

          if (salvo) {
            setAvatar(salvo);
          } else {
            setAvatar('👨‍🍳');
          }
        } catch (erro) {
          console.log('Erro ao carregar avatar:', erro);
        }
      }

      carregarAvatar();

      return () => {
        ativo = false;
      };
    }, [usuario?.uid])
  );

  const nomeUsuario =
    usuario?.displayName?.trim() ||
    usuario?.email?.split('@')[0] ||
    '';

  const receitasFiltradas = useMemo(() => {
    const texto = busca.trim().toLowerCase();

    return receitas.filter((receita) => {
      const pertenceCategoria =
        categoriaSelecionada === 'Todas' ||
        receita.categoria === categoriaSelecionada;

      const correspondeBusca =
        texto.length === 0 ||
        receita.nome.toLowerCase().includes(texto) ||
        receita.categoria.toLowerCase().includes(texto);

      return pertenceCategoria && correspondeBusca;
    });
  }, [busca, categoriaSelecionada]);

  const receitasDestaque = receitasFiltradas.slice(0, 6);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoArea}>
            <Text style={styles.logo}>Receitaí</Text>
            <Text style={styles.talheres}>🍴</Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/modal')}
            activeOpacity={0.8}
          >
            {avatarEhImagem(avatar) ? (
              <Image
                source={{ uri: avatar }}
                style={styles.avatarImagem}
              />
            ) : (
              <Text style={styles.avatarTexto}>
                {avatar}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.headerSubtitulo}>
          Receitas para todos os momentos
        </Text>

        <Text style={styles.ola}>
          {nomeUsuario ? `Olá, ${nomeUsuario}!` : 'Olá!'}{' '}
          <Text style={styles.mao}>👋</Text>
        </Text>

        <Text style={styles.titulo}>
          O que vamos cozinhar hoje?
        </Text>

        <Text style={styles.subtitulo}>
          Encontre receitas deliciosas e fáceis de preparar.
        </Text>

        <View style={styles.buscaContainer}>
          <Ionicons
            name="search-outline"
            size={23}
            color="#777777"
          />

          <TextInput
            style={styles.inputBusca}
            placeholder="Buscar uma receita..."
            placeholderTextColor="#999999"
            value={busca}
            onChangeText={setBusca}
            returnKeyType="search"
          />

          {busca.length > 0 && (
            <TouchableOpacity
              onPress={() => setBusca('')}
              activeOpacity={0.7}
            >
              <Ionicons
                name="close-circle"
                size={21}
                color="#AAAAAA"
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.tituloSecaoLinha}>
          <Text style={styles.tituloSecao}>Categorias</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriasContainer}
        >
          {categorias.map((categoria) => {
            const selecionada =
              categoria.nome === categoriaSelecionada;

            return (
              <TouchableOpacity
                key={categoria.nome}
                style={[
                  styles.categoria,
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
                    styles.categoriaTexto,
                    selecionada &&
                      styles.categoriaTextoSelecionada,
                  ]}
                >
                  {categoria.nome}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.dicaCard}>
          <View style={styles.dicaIconContainer}>
            <Text style={styles.dicaIcon}>💡</Text>
          </View>

          <View style={styles.dicaTextoContainer}>
            <Text style={styles.dicaTitulo}>Dica do dia</Text>

            <Text style={styles.dicaTexto}>
              Organize todos os ingredientes antes de começar a
              cozinhar. Isso deixa o preparo muito mais fácil!
            </Text>
          </View>
        </View>

        <View style={styles.secaoHeader}>
          <Text style={styles.tituloSecao}>
            Receitas em destaque
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/explore')}
            activeOpacity={0.7}
          >
            <Text style={styles.verTodas}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        {receitasDestaque.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.receitasContainer}
          >
            {receitasDestaque.map((receita) => (
              <TouchableOpacity
                key={receita.id}
                style={styles.receitaCard}
                onPress={() => router.push(`/${receita.id}`)}
                activeOpacity={0.85}
              >
                <Image
                  source={receita.imagem}
                  style={styles.receitaImagem}
                />

                <View style={styles.receitaInfo}>
                  <Text
                    style={styles.receitaNome}
                    numberOfLines={2}
                  >
                    {receita.nome}
                  </Text>

                  <View style={styles.receitaDetalhes}>
                    <View style={styles.detalheItem}>
                      <Ionicons
                        name="time-outline"
                        size={15}
                        color="#777777"
                      />

                      <Text style={styles.detalheTexto}>
                        {receita.tempo}
                      </Text>
                    </View>

                    <Text style={styles.ponto}>•</Text>

                    <Text style={styles.dificuldade}>
                      {receita.dificuldade}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.semResultados}>
            <Text style={styles.semResultadosEmoji}>🍽️</Text>

            <Text style={styles.semResultadosTitulo}>
              Nenhuma receita encontrada
            </Text>

            <Text style={styles.semResultadosTexto}>
              Tente pesquisar por outro nome ou escolher outra
              categoria.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.botaoExplorar}
          onPress={() => router.push('/(tabs)/explore')}
          activeOpacity={0.85}
        >
          <Text style={styles.botaoExplorarTexto}>
            Explorar todas as receitas
          </Text>

          <Ionicons
            name="arrow-forward"
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFDF9',
  },

  container: {
    flex: 1,
  },

  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 110,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    fontSize: 36,
    fontWeight: '800',
    color: '#F45D01',
    letterSpacing: -1,
  },

  talheres: {
    fontSize: 28,
    marginLeft: 8,
  },

  headerSubtitulo: {
    fontSize: 17,
    color: '#777777',
    marginTop: 2,
  },

  profileButton: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FFF1E8',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  avatarImagem: {
    width: '100%',
    height: '100%',
  },

  avatarTexto: {
    fontSize: 32,
  },

  ola: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    color: '#252525',
    marginTop: 30,
  },

  mao: {
    fontSize: 32,
  },

  titulo: {
    fontSize: 30,
    lineHeight: 35,
    fontWeight: '800',
    color: '#252525',
    marginTop: 8,
  },

  subtitulo: {
    fontSize: 18,
    lineHeight: 25,
    color: '#777777',
    marginTop: 14,
    marginBottom: 22,
  },

  buscaContainer: {
    height: 58,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 30,
  },

  inputBusca: {
    flex: 1,
    fontSize: 17,
    color: '#252525',
    marginLeft: 11,
    height: '100%',
  },

  tituloSecaoLinha: {
    marginBottom: 15,
  },

  tituloSecao: {
    fontSize: 22,
    fontWeight: '800',
    color: '#252525',
  },

  categoriasContainer: {
    paddingBottom: 8,
    paddingRight: 10,
  },

  categoria: {
    minWidth: 86,
    height: 88,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
  },

  categoriaSelecionada: {
    backgroundColor: '#FFF0E6',
    borderColor: '#F45D01',
  },

  categoriaEmoji: {
    fontSize: 28,
    marginBottom: 5,
  },

  categoriaTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666666',
    textAlign: 'center',
  },

  categoriaTextoSelecionada: {
    color: '#F45D01',
  },

  dicaCard: {
    backgroundColor: '#FFF0E6',
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 30,
  },

  dicaIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  dicaIcon: {
    fontSize: 27,
  },

  dicaTextoContainer: {
    flex: 1,
  },

  dicaTitulo: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F45D01',
    marginBottom: 5,
  },

  dicaTexto: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555555',
  },

  secaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  verTodas: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F45D01',
  },

  receitasContainer: {
    paddingRight: 10,
  },

  receitaCard: {
    width: 245,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginRight: 14,
  },

  receitaImagem: {
    width: '100%',
    height: 165,
  },

  receitaInfo: {
    padding: 14,
  },

  receitaNome: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '800',
    color: '#252525',
  },

  receitaDetalhes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  detalheItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  detalheTexto: {
    fontSize: 13,
    color: '#777777',
    marginLeft: 4,
  },

  ponto: {
    fontSize: 13,
    color: '#999999',
    marginHorizontal: 7,
  },

  dificuldade: {
    fontSize: 13,
    color: '#777777',
    fontWeight: '600',
  },

  semResultados: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    padding: 28,
    alignItems: 'center',
  },

  semResultadosEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },

  semResultadosTitulo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#252525',
    textAlign: 'center',
  },

  semResultadosTexto: {
    fontSize: 14,
    lineHeight: 20,
    color: '#777777',
    textAlign: 'center',
    marginTop: 7,
  },

  botaoExplorar: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#F45D01',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    gap: 10,
  },

  botaoExplorarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});