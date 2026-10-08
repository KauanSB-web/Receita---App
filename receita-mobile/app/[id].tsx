import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';

import receitas from '../data/receitas';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const FAVORITOS_VISITANTE_KEY = '@receitai_favoritos_visitante';

function obterChaveFavoritos(usuario: User | null): string {
  if (usuario?.uid) {
    return `@receitai_favoritos_${usuario.uid}`;
  }

  return FAVORITOS_VISITANTE_KEY;
}

export default function ReceitaDetalhesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [receitaFirestore, setReceitaFirestore] = useState<any>(null);
  const [carregandoReceitaFirestore, setCarregandoReceitaFirestore] = useState(true);

  const receita = receitas.find(
    (item) => String(item.id) === String(id)
  );

  const [usuario, setUsuario] = useState<User | null>(
    auth.currentUser
  );

  const [favorita, setFavorita] = useState(false);
  const [carregandoFavorito, setCarregandoFavorito] = useState(true);

  useEffect(() => {
    const carregarReceitaFirestore = async () => {
      if (receita || !usuario || !id) {
        setReceitaFirestore(null);
        setCarregandoReceitaFirestore(false);
        return;
      }

      try {
        const referencia = doc(db, "users", usuario.uid, "receitas", String(id));
        const snapshot = await getDoc(referencia);

        if (snapshot.exists()) {
          setReceitaFirestore({
            id: snapshot.id,
            ...snapshot.data(),
          });
        } else {
          setReceitaFirestore(null);
        }
      } catch (error) {
        console.log("Erro ao carregar receita do Firestore:", error);
        setReceitaFirestore(null);
      } finally {
        setCarregandoReceitaFirestore(false);
      }
    };

    carregarReceitaFirestore();
  }, [receita, usuario, id]);

  /*
   * OBSERVA A CONTA ATUAL
   *
   * Quando o usuário entra ou sai da conta,
   * a tela atualiza automaticamente.
   */
  useEffect(() => {
    const cancelarObservacao = onAuthStateChanged(
      auth,
      (user) => {
        setUsuario(user);
      }
    );

    return cancelarObservacao;
  }, []);

  /*
   * CARREGA O FAVORITO DA CONTA ATUAL
   */
  useEffect(() => {
    const carregarFavorito = async () => {
      setCarregandoFavorito(true);

      try {
        if (!receita && !receitaFirestore) {
          setFavorita(false);
          return;
        }

        const chaveFavoritos =
          obterChaveFavoritos(usuario);

        const dados = await AsyncStorage.getItem(
          chaveFavoritos
        );

        const favoritos: (number | string)[] = dados
          ? JSON.parse(dados)
          : [];

        const idReceita = receita
          ? Number(receita.id)
          : String(receitaFirestore.id);

        setFavorita(favoritos.includes(idReceita));
      } catch (error) {
        console.log(
          'Erro ao carregar favorito:',
          error
        );

        setFavorita(false);
      } finally {
        setCarregandoFavorito(false);
      }
    };

    carregarFavorito();
  }, [receita?.id, receitaFirestore?.id, usuario?.uid]);

  /*
   * ADICIONAR / REMOVER FAVORITO
   */
  const alternarFavorito = async () => {
    if (!receita && !receitaFirestore) return;

    try {
      const chaveFavoritos =
        obterChaveFavoritos(usuario);

      const dados = await AsyncStorage.getItem(
        chaveFavoritos
      );

      let favoritos: (number | string)[] = dados
        ? JSON.parse(dados)
        : [];

      const idReceita = receita
        ? Number(receita.id)
        : String(receitaFirestore.id);

      if (favorita) {
        favoritos = favoritos.filter(
          (item) => item !== idReceita
        );
      } else {
        if (!favoritos.includes(idReceita)) {
          favoritos.push(idReceita);
        }
      }

      await AsyncStorage.setItem(
        chaveFavoritos,
        JSON.stringify(favoritos)
      );

      setFavorita(!favorita);
    } catch (error) {
      console.log(
        'Erro ao salvar favorito:',
        error
      );
    }
  };

  const receitaAtual = receita ?? (receitaFirestore ? {
    id: receitaFirestore.id,
    nome: receitaFirestore.titulo || "Receita sem título",
    categoria: receitaFirestore.categoria || "Sem categoria",
    ingredientes: String(receitaFirestore.ingredientes || "").split("\n").map((item) => item.trim()).filter(Boolean),
    preparo: receitaFirestore.preparo || "",
    descricao: receitaFirestore.descricao || "",
    tempo: receitaFirestore.tempo || "",
    dificuldade: receitaFirestore.dificuldade || "",
  } : null);

  if (!receitaAtual) {
    return (
      <View style={styles.erroContainer}>
        <Text style={styles.erroEmoji}>🍽️</Text>

        <Text style={styles.erroTitulo}>
          Receita não encontrada
        </Text>

        <TouchableOpacity
          style={styles.voltarBotao}
          onPress={() => router.back()}
        >
          <Text style={styles.voltarTexto}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* IMAGEM */}
        <View style={styles.imagemContainer}>
          {receita ? (
            <Image
              source={receita.imagem}
              style={styles.imagem}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagemSemFoto}>
              <Text style={styles.imagemSemFotoTexto}>🍽️</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.voltarBotaoImagem}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color="#333"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.favoritoBotaoImagem}
            onPress={alternarFavorito}
            activeOpacity={0.8}
            disabled={carregandoFavorito}
          >
            <Ionicons
              name={
                favorita
                  ? 'heart'
                  : 'heart-outline'
              }
              size={27}
              color={
                favorita
                  ? '#E76518'
                  : '#333'
              }
            />
          </TouchableOpacity>
        </View>

        {/* CONTEÚDO */}
        <View style={styles.conteudo}>
          <Text style={styles.categoria}>
            {receitaAtual.categoria}
          </Text>

          <Text style={styles.titulo}>
            {receitaAtual.nome}
          </Text>

          {/* INFORMAÇÕES */}
          <View style={styles.infoLinha}>
            <View style={styles.infoItem}>
              <Ionicons
                name="time-outline"
                size={21}
                color="#E76518"
              />

              <Text style={styles.infoTexto}>
                {receitaAtual.tempo || "—"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons
                name="restaurant-outline"
                size={21}
                color="#E76518"
              />

              <Text style={styles.infoTexto}>
                {receitaAtual.dificuldade || "—"}
              </Text>
            </View>
          </View>

          <View style={styles.divisor} />

          {/* INGREDIENTES */}
          <Text style={styles.secaoTitulo}>
            Ingredientes
          </Text>

          <View style={styles.ingredientes}>
            {receitaAtual.ingredientes.map(
              (ingrediente, index) => (
                <View
                  key={`${ingrediente}-${index}`}
                  style={styles.ingredienteItem}
                >
                  <View style={styles.bolinha} />

                  <Text style={styles.ingredienteTexto}>
                    {ingrediente}
                  </Text>
                </View>
              )
            )}
          </View>

          {/* PREPARO */}
          <Text style={styles.secaoTitulo}>
            Modo de preparo
          </Text>

          <View style={styles.preparoCard}>
            <Text style={styles.preparoTexto}>
              {receitaAtual.preparo}
            </Text>
          </View>

          {/* FAVORITO */}
          <TouchableOpacity
            style={[
              styles.favoritarBotao,
              favorita &&
                styles.favoritarBotaoAtivo,
            ]}
            onPress={alternarFavorito}
            activeOpacity={0.85}
            disabled={carregandoFavorito}
          >
            <Ionicons
              name={
                favorita
                  ? 'heart'
                  : 'heart-outline'
              }
              size={23}
              color="#FFFFFF"
            />

            <Text style={styles.favoritarTexto}>
              {favorita
                ? 'Remover dos favoritos'
                : 'Adicionar aos favoritos'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F4',
  },

  scrollContent: {
    paddingBottom: 40,
  },

  imagemContainer: {
    height: 300,
    position: 'relative',
  },

  imagemSemFoto: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F0E8E1",
    alignItems: "center",
    justifyContent: "center",
  },

  imagemSemFotoTexto: {
    fontSize: 64,
  },

  imagem: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0E8E1',
  },

  voltarBotaoImagem: {
    position: 'absolute',
    top: 55,
    left: 18,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  favoritoBotaoImagem: {
    position: 'absolute',
    top: 55,
    right: 18,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  conteudo: {
    paddingHorizontal: 22,
    paddingTop: 24,
  },

  categoria: {
    color: '#E76518',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 7,
  },

  titulo: {
    color: '#292929',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    marginBottom: 18,
  },

  infoLinha: {
    flexDirection: 'row',
    gap: 24,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  infoTexto: {
    color: '#555',
    fontSize: 15,
    fontWeight: '600',
  },

  divisor: {
    height: 1,
    backgroundColor: '#E8DED6',
    marginVertical: 24,
  },

  secaoTitulo: {
    color: '#292929',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 15,
  },

  ingredientes: {
    marginBottom: 28,
  },

  ingredienteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  bolinha: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E76518',
    marginTop: 7,
    marginRight: 11,
  },

  ingredienteTexto: {
    flex: 1,
    color: '#555',
    fontSize: 16,
    lineHeight: 23,
  },

  preparoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#F0E4DB',
  },

  preparoTexto: {
    color: '#555',
    fontSize: 16,
    lineHeight: 26,
  },

  favoritarBotao: {
    height: 54,
    borderRadius: 16,
    backgroundColor: '#E76518',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },

  favoritarBotaoAtivo: {
    backgroundColor: '#C84F0D',
  },

  favoritarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  erroContainer: {
    flex: 1,
    backgroundColor: '#FFF9F4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },

  erroEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },

  erroTitulo: {
    color: '#292929',
    fontSize: 23,
    fontWeight: '800',
    marginBottom: 20,
  },

  voltarBotao: {
    backgroundColor: '#E76518',
    paddingHorizontal: 30,
    paddingVertical: 13,
    borderRadius: 12,
  },

  voltarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});