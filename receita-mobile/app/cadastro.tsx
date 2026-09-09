import React, { useState } from 'react';
import {
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
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { auth } from '../firebase';

export default function CadastroScreen() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  const criarConta = async () => {
    setErro('');

    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();

    if (
      !nomeLimpo ||
      !emailLimpo ||
      !senha.trim() ||
      !confirmarSenha.trim()
    ) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (!emailLimpo.includes('@')) {
      setErro('Digite um e-mail válido.');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      setSalvando(true);

      const resultado = await createUserWithEmailAndPassword(
        auth,
        emailLimpo,
        senha
      );

      await updateProfile(resultado.user, {
        displayName: nomeLimpo,
      });

      router.replace('/(tabs)');
    } catch (error: any) {
      console.log('Erro ao criar conta:', error);

      switch (error?.code) {
        case 'auth/email-already-in-use':
          setErro('Já existe uma conta com este e-mail.');
          break;

        case 'auth/invalid-email':
          setErro('Digite um e-mail válido.');
          break;

        case 'auth/weak-password':
          setErro('A senha deve ter pelo menos 6 caracteres.');
          break;

        case 'auth/operation-not-allowed':
          setErro(
            'O cadastro por e-mail e senha não está ativado no Firebase.'
          );
          break;

        case 'auth/network-request-failed':
          setErro(
            'Não foi possível conectar ao Firebase. Verifique sua internet.'
          );
          break;

        case 'auth/too-many-requests':
          setErro(
            'Muitas tentativas. Aguarde um pouco e tente novamente.'
          );
          break;

        default:
          setErro(
            'Não foi possível criar a conta. Tente novamente.'
          );
      }
    } finally {
      setSalvando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topo}>
            <TouchableOpacity
              style={styles.voltar}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color="#292929"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.logoArea}>
            <View style={styles.logoIcone}>
              <Ionicons
                name="restaurant"
                size={31}
                color="#FFFFFF"
              />
            </View>

            <Text style={styles.logo}>
              Receita<Text style={styles.logoLaranja}>í</Text>
            </Text>

            <Text style={styles.logoSubtitulo}>
              Receitas feitas para você
            </Text>
          </View>

          <View style={styles.formulario}>
            <Text style={styles.titulo}>
              Crie sua conta 🍴
            </Text>

            <Text style={styles.descricao}>
              Salve suas receitas favoritas e muito mais.
            </Text>

            <View style={styles.campoArea}>
              <Text style={styles.label}>Nome</Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={21}
                  color="#999"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Como podemos te chamar?"
                  placeholderTextColor="#AAAAAA"
                  value={nome}
                  onChangeText={setNome}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.campoArea}>
              <Text style={styles.label}>E-mail</Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={21}
                  color="#999"
                />

                <TextInput
                  style={styles.input}
                  placeholder="seuemail@email.com"
                  placeholderTextColor="#AAAAAA"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.campoArea}>
              <Text style={styles.label}>Senha</Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={21}
                  color="#999"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Crie uma senha"
                  placeholderTextColor="#AAAAAA"
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!mostrarSenha}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <TouchableOpacity
                  onPress={() => setMostrarSenha(!mostrarSenha)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={
                      mostrarSenha
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={21}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.campoArea}>
              <Text style={styles.label}>
                Confirmar senha
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={21}
                  color="#999"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Digite a senha novamente"
                  placeholderTextColor="#AAAAAA"
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                  secureTextEntry={!mostrarSenha}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {erro ? (
              <View style={styles.erro}>
                <Ionicons
                  name="alert-circle-outline"
                  size={19}
                  color="#D94B32"
                />

                <Text style={styles.erroTexto}>
                  {erro}
                </Text>
              </View>
            ) : null}

            <TouchableOpacity
              style={[
                styles.botao,
                salvando && styles.botaoDesativado,
              ]}
              onPress={criarConta}
              activeOpacity={0.85}
              disabled={salvando}
            >
              <Text style={styles.botaoTexto}>
                {salvando
                  ? 'Criando conta...'
                  : 'Criar minha conta'}
              </Text>

              {!salvando && (
                <Ionicons
                  name="arrow-forward"
                  size={21}
                  color="#FFFFFF"
                />
              )}
            </TouchableOpacity>

            <View style={styles.loginArea}>
              <Text style={styles.loginTexto}>
                Já possui uma conta?
              </Text>

              <TouchableOpacity
                onPress={() => router.push('/login')}
                activeOpacity={0.7}
              >
                <Text style={styles.loginLink}>
                  Entrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rodape}>
            <Ionicons
              name="heart"
              size={14}
              color="#E76518"
            />

            <Text style={styles.rodapeTexto}>
              Feito para quem ama cozinhar
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9F4',
  },

  flex: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingBottom: 30,
  },

  topo: {
    paddingTop: 10,
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

  logoArea: {
    alignItems: 'center',
    marginTop: 20,
  },

  logoIcone: {
    width: 62,
    height: 62,
    borderRadius: 21,
    backgroundColor: '#E76518',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  logo: {
    color: '#292929',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },

  logoLaranja: {
    color: '#E76518',
  },

  logoSubtitulo: {
    color: '#999',
    fontSize: 13,
    marginTop: 3,
  },

  formulario: {
    marginTop: 30,
  },

  titulo: {
    color: '#292929',
    fontSize: 27,
    fontWeight: '900',
  },

  descricao: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
    marginBottom: 24,
  },

  campoArea: {
    marginBottom: 17,
  },

  label: {
    color: '#292929',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },

  inputContainer: {
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEE3DB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    color: '#292929',
    fontSize: 15,
    marginLeft: 11,
    paddingVertical: 14,
  },

  erro: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF0EC',
    borderWidth: 1,
    borderColor: '#F4C8BE',
    borderRadius: 14,
    padding: 13,
    marginBottom: 16,
  },

  erroTexto: {
    flex: 1,
    color: '#B83D2A',
    fontSize: 13,
    lineHeight: 19,
    marginLeft: 8,
    fontWeight: '600',
  },

  botao: {
    minHeight: 58,
    borderRadius: 17,
    backgroundColor: '#E76518',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginTop: 4,
  },

  botaoDesativado: {
    opacity: 0.65,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    marginRight: 9,
  },

  loginArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },

  loginTexto: {
    color: '#888',
    fontSize: 14,
  },

  loginLink: {
    color: '#E76518',
    fontSize: 14,
    fontWeight: '900',
    marginLeft: 5,
  },

  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingTop: 30,
  },

  rodapeTexto: {
    color: '#999',
    fontSize: 12,
    marginLeft: 5,
  },
});
