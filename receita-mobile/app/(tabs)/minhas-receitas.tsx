import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';

import { auth, db } from '../../firebase';

type Receita = {
  id: string;
  titulo?: string;
  descricao?: string;
  categoria?: string;
};

export default function MinhasReceitasScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<User | null>(auth.currentUser);
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const cancelarObservacao = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return cancelarObservacao;
  }, []);

  useEffect(() => {
    if (!usuario) {
      setReceitas([]);
      setCarregando(false);
      setErro(null);
      return;
    }

    let ativo = true;
    const uid = usuario.uid;

    async function carregarReceitas() {
      setCarregando(true);
      setErro(null);

      try {
        const receitasRef = collection(
          db,
          'users',
          uid,
          'receitas',
        );

        const consulta = query(receitasRef, orderBy('criadoEm', 'desc'));
        const resultado = await getDocs(consulta);

        if (!ativo) {
          return;
        }

        const receitasCarregadas: Receita[] = resultado.docs.map((documento) => ({
          id: documento.id,
          ...(documento.data() as Omit<Receita, 'id'>),
        }));

        setReceitas(receitasCarregadas);
      } catch {
        if (ativo) {
          setErro('Não foi possível carregar suas receitas.');
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarReceitas();

    return () => {
      ativo = false;
    };
  }, [usuario]);

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Minhas receitas</Text>
        <Text style={styles.message}>
          Entre na sua conta para criar e gerenciar suas receitas.
        </Text>
      </View>
    );
  }

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#F45D01" />
        <Text style={styles.message}>Carregando suas receitas...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Minhas receitas</Text>
        <Text style={styles.error}>{erro}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas receitas</Text>

      <TouchableOpacity
        style={styles.botaoNovaReceita}
        onPress={() => router.push('/nova-receita')}
        activeOpacity={0.85}
      >
        <Text style={styles.botaoNovaReceitaTexto}>+ Nova receita</Text>
      </TouchableOpacity>

      {receitas.length === 0 ? (
        <Text style={styles.message}>
          Você ainda não criou nenhuma receita.
        </Text>
      ) : (
        <FlatList
          data={receitas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push({ pathname: "/[id]", params: { id: item.id } })}
              activeOpacity={0.85}
            >
              <Text style={styles.cardTitle}>
                {item.titulo || 'Receita sem título'}
              </Text>

              {item.categoria ? (
                <Text style={styles.category}>{item.categoria}</Text>
              ) : null}

              {item.descricao ? (
                <Text style={styles.description}>{item.descricao}</Text>
              ) : null}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 20,
  },
  botaoNovaReceita: {
    minHeight: 50,
    borderRadius: 12,
    backgroundColor: '#F45D01',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  botaoNovaReceitaTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
    textAlign: 'center',
    marginTop: 12,
  },
  error: {
    fontSize: 16,
    lineHeight: 24,
    color: '#C62828',
  },
  lista: {
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    backgroundColor: '#F8F8F8',
    borderRadius: 14,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222222',
  },
  category: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F45D01',
    marginTop: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666666',
    marginTop: 8,
  },
});
