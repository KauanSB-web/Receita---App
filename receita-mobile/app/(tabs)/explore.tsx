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

const receitas = [
  { id: 1, nome: 'Arroz com Frango', categoria: 'Almoço', tempo: '40 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80' },
  { id: 2, nome: 'Macarrão ao Molho de Tomate', categoria: 'Massas', tempo: '30 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=800&q=80' },
  { id: 3, nome: 'Lasanha de Carne', categoria: 'Massas', tempo: '60 min', dificuldade: 'Médio', imagem: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80' },
  { id: 4, nome: 'Panqueca de Carne', categoria: 'Almoço', tempo: '35 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80' },
  { id: 5, nome: 'Strogonoff de Frango', categoria: 'Almoço', tempo: '35 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80' },
  { id: 6, nome: 'Escondidinho de Carne', categoria: 'Almoço', tempo: '50 min', dificuldade: 'Médio', imagem: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80' },
  { id: 7, nome: 'Frango Assado', categoria: 'Almoço', tempo: '70 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80' },
  { id: 8, nome: 'Risoto de Frango', categoria: 'Almoço', tempo: '45 min', dificuldade: 'Médio', imagem: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80' },
  { id: 9, nome: 'Omelete de Legumes', categoria: 'Saudáveis', tempo: '15 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1510693206972-df098f0cbf06?auto=format&fit=crop&w=800&q=80' },
  { id: 10, nome: 'Salada Colorida', categoria: 'Saudáveis', tempo: '15 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80' },
  { id: 11, nome: 'Coxinha', categoria: 'Lanches', tempo: '60 min', dificuldade: 'Médio', imagem: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Coxinha.jpg' },
  { id: 12, nome: 'Feijoada', categoria: 'Almoço', tempo: '120 min', dificuldade: 'Médio', imagem: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Feijoada_-_S%C3%A3o_Carlos.jpg' },
  { id: 13, nome: 'Hambúrguer Caseiro', categoria: 'Lanches', tempo: '30 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
  { id: 14, nome: 'Pizza Caseira', categoria: 'Massas', tempo: '50 min', dificuldade: 'Médio', imagem: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80' },
  { id: 15, nome: 'Pão de Queijo', categoria: 'Café da manhã', tempo: '30 min', dificuldade: 'Fácil', imagem: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/P%C3%A3o_de_Queijo.jpg' },
  { id: 16, nome: 'Tapioca Recheada', categoria: 'Café da manhã', tempo: '15 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80' },
  { id: 17, nome: 'Bolo de Chocolate', categoria: 'Sobremesas', tempo: '45 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80' },
  { id: 18, nome: 'Brigadeiro', categoria: 'Sobremesas', tempo: '25 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1575377427642-087cf684f04d?auto=format&fit=crop&w=800&q=80' },
  { id: 19, nome: 'Mousse de Chocolate', categoria: 'Sobremesas', tempo: '20 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80' },
  { id: 20, nome: 'Pudim de Leite', categoria: 'Sobremesas', tempo: '60 min', dificuldade: 'Médio', imagem: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Pudins_de_leite_condensado.jpg' },
  { id: 21, nome: 'Bolo de Cenoura', categoria: 'Sobremesas', tempo: '50 min', dificuldade: 'Fácil', imagem: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Bolo_de_Cenoura%2C_08-12-2020.jpg' },
  { id: 22, nome: 'Vitamina de Banana', categoria: 'Saudáveis', tempo: '10 min', dificuldade: 'Fácil', imagem: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Banana_Smoothie.jpg' },
  { id: 23, nome: 'Smoothie de Morango', categoria: 'Saudáveis', tempo: '10 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80' },
  { id: 24, nome: 'Sanduíche Natural', categoria: 'Lanches', tempo: '10 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80' },
  { id: 25, nome: 'Crepioca', categoria: 'Café da manhã', tempo: '15 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80' },
  { id: 26, nome: 'Pão na Chapa', categoria: 'Café da manhã', tempo: '10 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' },
  { id: 27, nome: 'Caldo de Legumes', categoria: 'Saudáveis', tempo: '40 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80' },
  { id: 28, nome: 'Torta de Frango', categoria: 'Lanches', tempo: '55 min', dificuldade: 'Médio', imagem: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80' },
  { id: 29, nome: 'Macarrão Cremoso', categoria: 'Massas', tempo: '25 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80' },
  { id: 30, nome: 'Salada de Frutas', categoria: 'Saudáveis', tempo: '10 min', dificuldade: 'Fácil', imagem: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80' },
];

const categorias = ['Todas', 'Massas', 'Sobremesas', 'Saudáveis', 'Lanches', 'Almoço', 'Café da manhã'];

export default function Explorar() {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todas');

  const filtradas = useMemo(() => {
    return receitas.filter((receita) => {
      const correspondeCategoria =
        categoria === 'Todas' || receita.categoria === categoria;

      const texto = busca.toLowerCase().trim();

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
            <Text style={styles.logo}>Receitaí 🍴</Text>
            <Text style={styles.titulo}>Explorar receitas</Text>
            <Text style={styles.subtitulo}>
              Encontre sua próxima receita favorita.
            </Text>

            <View style={styles.busca}>
              <Ionicons name="search" size={23} color="#999" />
              <TextInput
                value={busca}
                onChangeText={setBusca}
                placeholder="Buscar receitas..."
                placeholderTextColor="#999"
                style={styles.input}
              />
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
                    categoria === item && styles.categoriaAtiva,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoriaTexto,
                      categoria === item && styles.categoriaTextoAtivo,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />

            <View style={styles.resultado}>
              <Text style={styles.resultadoTitulo}>Receitas</Text>
              <Text style={styles.quantidade}>{filtradas.length} encontradas</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={styles.cardConteudo}>
              <Text style={styles.nome} numberOfLines={2}>
                {item.nome}
              </Text>

              <Text style={styles.categoriaCard}>{item.categoria}</Text>

              <View style={styles.info}>
                <Text style={styles.infoTexto}>⏱ {item.tempo}</Text>
                <Text style={styles.infoTexto}>{item.dificuldade}</Text>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioEmoji}>🔎</Text>
            <Text style={styles.vazioTitulo}>Nenhuma receita encontrada</Text>
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
    paddingBottom: 30,
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
    backgroundColor: '#F1F1F1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
  },
  categorias: {
    paddingVertical: 18,
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
    marginTop: 9,
  },
  infoTexto: {
    color: '#888',
    fontSize: 11,
  },
  vazio: {
    alignItems: 'center',
    paddingTop: 50,
  },
  vazioEmoji: {
    fontSize: 42,
  },
  vazioTitulo: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
  },
  vazioTexto: {
    marginTop: 6,
    color: '#888',
  },
});
