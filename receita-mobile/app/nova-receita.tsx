import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { File, Paths } from 'expo-file-system';
import {
  ActivityIndicator,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'expo-router';

import { auth, db } from '../firebase';

const categorias = [
  'Massas',
  'Sobremesas',
  'Saudável',
  'Lanches',
  'Almoço',
  'Café da manhã',
];

export default function NovaReceitaScreen() {
  const router = useRouter();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [preparo, setPreparo] = useState('');
  const [tempo, setTempo] = useState('');
  const [dificuldade, setDificuldade] = useState('');
  const [imagemUri, setImagemUri] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function salvarImagemLocal(imagemUri: string, receitaId: string) {
  const arquivoOrigem = new File(imagemUri);
  const arquivoDestino = new File(
    Paths.document,
    `receita-${receitaId}${arquivoOrigem.extension || '.jpg'}`,
  );

  await arquivoOrigem.copy(arquivoDestino, { overwrite: true });

  if (!arquivoDestino.exists) {
    throw new Error('A imagem da receita não foi salva no armazenamento local.');
  }

  return arquivoDestino.uri;
}

async function selecionarImagem() {
    try {
      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          'Permissão necessária',
          'Para escolher uma foto da receita, é necessário permitir o acesso às suas fotos.',
        );

        return;
      }

      const resultado =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.9,
        });

      if (resultado.canceled) {
        return;
      }

      const imagemSelecionada =
        resultado.assets?.[0]?.uri;

      if (!imagemSelecionada) {
        return;
      }

      setImagemUri(imagemSelecionada);
    } catch (error) {
      console.log('Erro ao selecionar imagem da receita:', error);

      Alert.alert(
        'Erro',
        'Não foi possível selecionar a imagem.',
      );
    }
  }

  async function salvarReceita() {
    const usuario = auth.currentUser;

    if (!usuario) {
      setErro('Entre na sua conta para criar uma receita.');
      return;
    }

    if (!titulo.trim()) {
      setErro('Informe o título da receita.');
      return;
    }

    if (!categoria) {
      setErro('Selecione uma categoria.');
      return;
    }

    if (!ingredientes.trim()) {
      setErro('Informe os ingredientes.');
      return;
    }

    if (!preparo.trim()) {
      setErro('Informe o modo de preparo.');
      return;
    }

    if (!tempo.trim()) {
      setErro('Informe o tempo de preparo.');
      return;
    }

    if (!dificuldade) {
      setErro('Selecione a dificuldade da receita.');
      return;
    }

    setSalvando(true);
    setErro(null);

    try {
      const receitaRef = await addDoc(
        collection(db, 'users', usuario.uid, 'receitas'),
        {
          titulo: titulo.trim(),
          descricao: descricao.trim(),
          categoria,
          ingredientes: ingredientes.trim(),
          preparo: preparo.trim(),
          tempo: tempo.trim(),
          dificuldade: dificuldade.trim(),
          criadoEm: serverTimestamp(),
          atualizadoEm: serverTimestamp(),
        },
      );

      if (imagemUri) {
        await salvarImagemLocal(imagemUri, receitaRef.id);
      }

      router.replace('/(tabs)/minhas-receitas');
    } catch {
      setErro('Não foi possível salvar sua receita. Tente novamente.');
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.conteudo}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.titulo}>Nova receita</Text>

          <Text style={styles.descricao}>
            Compartilhe os detalhes da receita que você preparou.
          </Text>

          <View style={styles.campoArea}>
            <Text style={styles.label}>Título</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Lasanha de frango"
              placeholderTextColor="#AAAAAA"
              value={titulo}
              onChangeText={setTitulo}
              autoCapitalize="sentences"
              autoCorrect
              editable={!salvando}
            />
          </View>

          <View style={styles.campoArea}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.inputMultilinha]}
              placeholder="Conte um pouco sobre sua receita"
              placeholderTextColor="#AAAAAA"
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              editable={!salvando}
            />
          </View>

          <View style={styles.campoArea}>
            <Text style={styles.label}>Foto da receita</Text>

            <TouchableOpacity
              style={styles.fotoReceitaBotao}
              onPress={selecionarImagem}
              activeOpacity={0.8}
              disabled={salvando}
            >
              {imagemUri ? (
                <Image
                  source={{ uri: imagemUri }}
                  style={styles.fotoReceita}
                  resizeMode="cover"
                />
              ) : (
                <>
                  <Text style={styles.fotoReceitaIcone}>📷</Text>
                  <Text style={styles.fotoReceitaTexto}>
                    Adicionar foto da galeria
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.campoArea}>
            <Text style={styles.label}>Categoria</Text>

            <View style={styles.categorias}>
              {categorias.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.categoria,
                    categoria === item && styles.categoriaSelecionada,
                  ]}
                  onPress={() => setCategoria(item)}
                  activeOpacity={0.8}
                  disabled={salvando}
                >
                  <Text
                    style={[
                      styles.categoriaTexto,
                      categoria === item &&
                        styles.categoriaTextoSelecionada,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.campoArea}>
            <Text style={styles.label}>Ingredientes</Text>
            <TextInput
              style={[styles.input, styles.inputGrande]}
              placeholder={'Ex.:\n2 xícaras de farinha\n1 ovo\n1 xícara de leite'}
              placeholderTextColor="#AAAAAA"
              value={ingredientes}
              onChangeText={setIngredientes}
              multiline
              textAlignVertical="top"
              editable={!salvando}
            />
          </View>

          <View style={styles.campoArea}>
            <Text style={styles.label}>Tempo de preparo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: 45 min"
              placeholderTextColor="#AAAAAA"
              value={tempo}
              onChangeText={setTempo}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!salvando}
            />
          </View>

          <View style={styles.campoArea}>
            <Text style={styles.label}>Dificuldade</Text>

            <View style={styles.categorias}>
              {['Fácil', 'Médio', 'Difícil'].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.categoria,
                    dificuldade === item &&
                      styles.categoriaSelecionada,
                  ]}
                  onPress={() => setDificuldade(item)}
                  activeOpacity={0.8}
                  disabled={salvando}
                >
                  <Text
                    style={[
                      styles.categoriaTexto,
                      dificuldade === item &&
                        styles.categoriaTextoSelecionada,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.campoArea}>
            <Text style={styles.label}>Modo de preparo</Text>
            <TextInput
              style={[styles.input, styles.inputGrande]}
              placeholder="Descreva o passo a passo da receita"
              placeholderTextColor="#AAAAAA"
              value={preparo}
              onChangeText={setPreparo}
              multiline
              textAlignVertical="top"
              editable={!salvando}
            />
          </View>

          {erro ? (
            <View style={styles.erro}>
              <Text style={styles.erroTexto}>{erro}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[
              styles.botao,
              salvando && styles.botaoDesativado,
            ]}
            onPress={salvarReceita}
            activeOpacity={0.85}
            disabled={salvando}
          >
            {salvando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.botaoTexto}>
                Salvar receita
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222222',
  },
  descricao: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
    marginTop: 8,
    marginBottom: 28,
  },
  campoArea: {
    marginBottom: 20,
  },
  fotoReceitaBotao: {
    height: 220,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fotoReceita: {
    width: '100%',
    height: '100%',
  },
  fotoReceitaIcone: {
    fontSize: 42,
    marginBottom: 8,
  },
  fotoReceitaTexto: {
    fontSize: 15,
    color: '#666666',
    fontWeight: '600',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#222222',
    backgroundColor: '#FFFFFF',
  },
  inputMultilinha: {
    minHeight: 100,
  },
  inputGrande: {
    minHeight: 160,
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoria: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  categoriaSelecionada: {
    backgroundColor: '#F45D01',
    borderColor: '#F45D01',
  },
  categoriaTexto: {
    color: '#555555',
    fontSize: 14,
  },
  categoriaTextoSelecionada: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  erro: {
    backgroundColor: '#FFF1EE',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  erroTexto: {
    color: '#D94B32',
    fontSize: 14,
    lineHeight: 20,
  },
  botao: {
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: '#F45D01',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  botaoDesativado: {
    opacity: 0.7,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
