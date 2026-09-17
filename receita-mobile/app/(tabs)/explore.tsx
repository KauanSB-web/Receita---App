import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import receitas from '../../data/receitas';

const categorias = [
  'Todas',
  'Massas',
  'Sobremesa',
  'Lanches',
  'Almoço',
  'Saudável',
  'Café da manhã',
  'Bebidas',
];

export default function Explorar() {
  const router = useRouter();

  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todas');

  const filtradas = useMemo(() => {
    const texto = busca.toLowerCase().trim();

    return receitas.filter((receita) => {
      const correspondeCategoria =
        categoria === 'Todas' ||
        receita.categoria === categoria;

      const correspondeBusca =
        !texto ||
        receita.nome.toLowerCase().includes(texto) ||
        receita.categoria.toLowerCase().includes(texto);

      return correspondeCategoria && correspondeBusca;
    });
  }, [busca, categoria]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filtradas}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
        columnWrapperStyle={styles.colunas}
        ListHeaderComponent={
          <View>
            <Text style={styles.logo}>
              Receitaí 🍴
            </Text>

            <Text style={styles.titulo}>
              Explorar receitas
            </Text>

            <Text style={styles.subtitulo}>
              Encontre sua próxima receita favorita.
            </Text>

            <View style={styles.busca}>
              <Ionicons
                name="search"
                size={23}
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
                <Pressable
                  onPress={() => setBusca('')}
                  hitSlop={8}
                >
                  <Ionicons
                    name="close-circle"
                    size={21}
                    color="#AAAAAA"
                  />
                </Pressable>
              )}
            </View>

            <FlatList
              horizontal
              data={categorias}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categorias}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setCategoria(item)}
                  style={[
                    styles.categoria,
                    categoria === item &&
                      styles.categoriaAtiva,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoriaTexto,
                      categoria === item &&
                        styles.categoriaTextoAtivo,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />

            <View style={styles.resultado}>
              <Text style={styles.resultadoTitulo}>
                Receitas
              </Text>

              <Text style={styles.quantidade}>
                {filtradas.length}{' '}
                {filtradas.length === 1
                  ? 'encontrada'
                  : 'encontradas'}
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push(`/${item.id}`)
            }
          >
            <Image
              source={item.imagem}
              style={styles.imagem}
              resizeMode="cover"
            />

            <View style={styles.cardConteudo}>
              <Text
                style={styles.nome}
                numberOfLines={2}
              >
                {item.nome}
              </Text>

              <Text style={styles.categoriaCard}>
                {item.categoria}
              </Text>

              <View style={styles.info}>
                <View style={styles.infoItem}>
                  <Ionicons
                    name="time-outline"
                    size={13}
                    color="#888"
                  />

                  <Text style={styles.infoTexto}>
                    {item.tempo}
                  </Text>
                </View>

                <Text style={styles.infoTexto}>
                  {item.dificuldade}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioEmoji}>
              🔎
            </Text>

            <Text style={styles.vazioTitulo}>
              Nenhuma receita encontrada
            </Text>

            <Text style={styles.vazioTexto}>
              Tente outro nome ou categoria.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F1',
  },

  lista: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },

  colunas: {
    justifyContent: 'space-between',
  },

  logo: {
    marginTop: 12,
    color: '#F45D01',
    fontSize: 30,
    fontWeight: '800',
  },

  titulo: {
    marginTop: 24,
    color: '#202020',
    fontSize: 30,
    fontWeight: '800',
  },

  subtitulo: {
    marginTop: 6,
    color: '#777',
    fontSize: 16,
    marginBottom: 18,
  },

  busca: {
    height: 54,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
    color: '#333',
    fontSize: 16,
    height: '100%',
  },

  categorias: {
    paddingVertical: 18,
    paddingRight: 10,
    gap: 8,
  },

  categoria: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  categoriaAtiva: {
    backgroundColor: '#F45D01',
    borderColor: '#F45D01',
  },

  categoriaTexto: {
    color: '#666',
    fontWeight: '600',
  },

  categoriaTextoAtivo: {
    color: '#FFFFFF',
  },

  resultado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  resultadoTitulo: {
    fontSize: 23,
    fontWeight: '800',
    color: '#202020',
  },

  quantidade: {
    color: '#888',
    fontSize: 14,
  },

  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  imagem: {
    width: '100%',
    height: 130,
    backgroundColor: '#EEEEEE',
  },

  cardConteudo: {
    padding: 12,
  },

  nome: {
    color: '#222',
    fontSize: 17,
    fontWeight: '800',
    minHeight: 42,
  },

  categoriaCard: {
    color: '#F45D01',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },

  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 9,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoTexto: {
    color: '#888',
    fontSize: 11,
    marginLeft: 3,
  },

  vazio: {
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  vazioEmoji: {
    fontSize: 42,
  },

  vazioTitulo: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
    textAlign: 'center',
  },

  vazioTexto: {
    marginTop: 6,
    color: '#888',
    textAlign: 'center',
  },
});