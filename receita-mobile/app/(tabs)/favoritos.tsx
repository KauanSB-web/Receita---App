import React, { useCallback, useState } from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import {
  useFocusEffect,
  useRouter,
} from 'expo-router';
import {
  onAuthStateChanged,
  User,
} from 'firebase/auth';

import receitas from '../../data/receitas';
import { auth } from '../../firebase';

const FAVORITOS_VISITANTE_KEY =
  '@receitai_favoritos_visitante';

function obterChaveFavoritos(
  usuario: User | null
): string {
  if (usuario?.uid) {
    return `@receitai_favoritos_${usuario.uid}`;
  }

  return FAVORITOS_VISITANTE_KEY;
}

export default function FavoritosScreen() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<User | null>(
    auth.currentUser
  );

  const [favoritos, setFavoritos] = useState<number[]>(
    []
  );

  const [atualizando, setAtualizando] =
    useState(false);

  /*
   * OBSERVA A CONTA ATUAL
   */
  React.useEffect(() => {
    const cancelarObservacao = onAuthStateChanged(
      auth,
      (user) => {
        setUsuario(user);
      }
    );

    return cancelarObservacao;
  }, []);

  /*
   * CARREGA OS FAVORITOS DA CONTA ATUAL
   */
  const carregarFavoritos = async () => {
    try {
      const chaveFavoritos =
        obterChaveFavoritos(usuario);

      const dados = await AsyncStorage.getItem(
        chaveFavoritos
      );

      const ids: number[] = dados
        ? JSON.parse(dados)
        : [];

      setFavoritos(ids);
    } catch (error) {
      console.log(
        'Erro ao carregar favoritos:',
        error
      );

      setFavoritos([]);
    }
  };

  /*
   * ATUALIZA QUANDO ENTRA NA TELA
   *
   * Isso também garante que, ao trocar
   * de conta, a lista seja atualizada.
   */
  useFocusEffect(
    useCallback(() => {
      carregarFavoritos();
    }, [usuario?.uid])
  );

  /*
   * ATUALIZAR MANUALMENTE
   */
  const atualizar = async () => {
    setAtualizando(true);

    await carregarFavoritos();

    setAtualizando(false);
  };

  /*
   * REMOVER FAVORITO
   */
  const removerFavorito = async (id: number) => {
    try {
      const novosFavoritos =
        favoritos.filter(
          (favoritoId) =>
            favoritoId !== id
        );

      const chaveFavoritos =
        obterChaveFavoritos(usuario);

      await AsyncStorage.setItem(
        chaveFavoritos,
        JSON.stringify(novosFavoritos)
      );

      setFavoritos(novosFavoritos);
    } catch (error) {
      console.log(
        'Erro ao remover favorito:',
        error
      );
    }
  };

  const receitasFavoritas =
    receitas.filter((receita) =>
      favoritos.includes(
        Number(receita.id)
      )
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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
              color="#292929"
            />
          </TouchableOpacity>

          <View style={styles.headerTexto}>
            <Text style={styles.titulo}>
              Meus favoritos
            </Text>

            <Text style={styles.subtitulo}>
              {receitasFavoritas.length}{' '}
              {receitasFavoritas.length === 1
                ? 'receita salva'
                : 'receitas salvas'}
            </Text>
          </View>

          <View style={styles.iconeHeader}>
            <Ionicons
              name="heart"
              size={25}
              color="#E76518"
            />
          </View>
        </View>

        {/* CONTEÚDO */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.scrollContent
          }
          refreshControl={
            <RefreshControl
              refreshing={atualizando}
              onRefresh={atualizar}
              tintColor="#E76518"
            />
          }
        >
          {receitasFavoritas.length === 0 ? (
            <View style={styles.vazio}>
              <View style={styles.vazioIcone}>
                <Ionicons
                  name="heart-outline"
                  size={58}
                  color="#E76518"
                />
              </View>

              <Text style={styles.vazioTitulo}>
                Nenhuma receita favorita
              </Text>

              <Text style={styles.vazioTexto}>
                Toque no coração de uma receita
                para
                {'\n'}
                salvá-la aqui.
              </Text>

              <TouchableOpacity
                style={styles.explorarBotao}
                onPress={() =>
                  router.replace(
                    '/(tabs)/explore'
                  )
                }
                activeOpacity={0.85}
              >
                <Ionicons
                  name="search-outline"
                  size={21}
                  color="#FFFFFF"
                />

                <Text style={styles.explorarTexto}>
                  Explorar receitas
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.lista}>
              {receitasFavoritas.map(
                (receita) => (
                  <TouchableOpacity
                    key={receita.id}
                    style={styles.card}
                    onPress={() =>
                      router.push({
                        pathname: '/[id]',
                        params: {
                          id: String(
                            receita.id
                          ),
                        },
                      })
                    }
                    activeOpacity={0.88}
                  >
                    <Image
                      source={{
                        uri: receita.imagem,
                      }}
                      style={styles.imagem}
                      resizeMode="cover"
                    />

                    <View style={styles.info}>
                      <Text
                        style={styles.nome}
                        numberOfLines={2}
                      >
                        {receita.nome}
                      </Text>

                      <Text
                        style={styles.categoria}
                      >
                        {receita.categoria}
                      </Text>

                      <View
                        style={
                          styles.detalhes
                        }
                      >
                        <View
                          style={
                            styles.detalheItem
                          }
                        >
                          <Ionicons
                            name="time-outline"
                            size={17}
                            color="#888"
                          />

                          <Text
                            style={
                              styles.detalheTexto
                            }
                          >
                            {receita.tempo}
                          </Text>
                        </View>

                        <Text
                          style={styles.ponto}
                        >
                          •
                        </Text>

                        <Text
                          style={
                            styles.detalheTexto
                          }
                        >
                          {receita.dificuldade}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.remover}
                      onPress={() =>
                        removerFavorito(
                          Number(
                            receita.id
                          )
                        )
                      }
                      activeOpacity={0.75}
                    >
                      <Ionicons
                        name="heart"
                        size={24}
                        color="#E76518"
                      />
                    </TouchableOpacity>

                    <Ionicons
                      name="chevron-forward"
                      size={23}
                      color="#C8C8C8"
                      style={styles.seta}
                    />
                  </TouchableOpacity>
                )
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9F4',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFF9F4',
  },

  header: {
    minHeight: 105,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9F4',
  },

  voltar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEE3DB',
  },

  headerTexto: {
    flex: 1,
    marginLeft: 14,
  },

  titulo: {
    color: '#292929',
    fontSize: 25,
    fontWeight: '800',
  },

  subtitulo: {
    color: '#888',
    fontSize: 14,
    marginTop: 3,
  },

  iconeHeader: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEE3DB',
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 35,
  },

  lista: {
    gap: 14,
    paddingTop: 5,
  },

  card: {
    minHeight: 125,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E9E2DC',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    position: 'relative',
  },

  imagem: {
    width: 105,
    height: 100,
    borderRadius: 17,
    backgroundColor: '#F0E8E1',
  },

  info: {
    flex: 1,
    paddingHorizontal: 13,
    paddingRight: 35,
    justifyContent: 'center',
  },

  nome: {
    color: '#292929',
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '800',
  },

  categoria: {
    color: '#E76518',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 5,
  },

  detalhes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
    gap: 5,
  },

  detalheItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  detalheTexto: {
    color: '#888',
    fontSize: 13,
  },

  ponto: {
    color: '#AAAAAA',
    fontSize: 14,
  },

  remover: {
    position: 'absolute',
    right: 37,
    top: 13,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF1E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  seta: {
    position: 'absolute',
    right: 10,
    top: 56,
  },

  vazio: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 90,
    paddingHorizontal: 25,
  },

  vazioIcone: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#FFF0E7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  vazioTitulo: {
    color: '#292929',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },

  vazioTexto: {
    color: '#888',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 9,
  },

  explorarBotao: {
    marginTop: 25,
    height: 52,
    paddingHorizontal: 22,
    borderRadius: 15,
    backgroundColor: '#E76518',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  explorarTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});