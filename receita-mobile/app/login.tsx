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
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [entrando, setEntrando] = useState(false);

  const entrar = async () => {
    setErro('');

    const emailLimpo = email.trim().toLowerCase();

    if (!emailLimpo || !senha.trim()) {
      setErro('Preencha o e-mail e a senha.');
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

    try {
      setEntrando(true);

      await signInWithEmailAndPassword(
        auth,
        emailLimpo,
        senha
      );

      router.replace('/(tabs)');
    } catch (error: any) {
      console.log('Erro ao entrar:', error);

      switch (error?.code) {
        case 'auth/invalid-credential':
          setErro('E-mail ou senha incorretos.');
          break;

        case 'auth/user-not-found':
          setErro('Não encontramos uma conta com este e-mail.');
          break;

        case 'auth/wrong-password':
          setErro('Senha incorreta.');
          break;

        case 'auth/invalid-email':
          setErro('Digite um e-mail válido.');
          break;

        case 'auth/too-many-requests':
          setErro(
            'Muitas tentativas. Aguarde um pouco e tente novamente.'
          );
          break;

        case 'auth/network-request-failed':
          setErro(
            'Não foi possível conectar ao Firebase. Verifique sua internet.'
          );
          break;

        default:
          setErro(
            'Não foi possível entrar. Tente novamente.'
          );
      }
    } finally {
      setEntrando(false);
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
              Bem-vindo de volta! 👋
            </Text>

            <Text style={styles.descricao}>
              Entre na sua conta para continuar.
            </Text>

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
                  editable={!entrando}
                />
              </View>
            </View>

            <View style={styles.campoArea}>
              <View style={styles.senhaTopo}>
                <Text style={styles.label}>Senha</Text>

                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled={entrando}
                >
                  <Text style={styles.esqueceu}>
                    Esqueceu a senha?
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={21}
                  color="#999"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#AAAAAA"
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!mostrarSenha}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!entrando}
                />

                <TouchableOpacity
                  onPress={() =>
                    setMostrarSenha(!mostrarSenha)
                  }
                  activeOpacity={0.7}
                  disabled={entrando}
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
                styles.botaoEntrar,
                entrando && styles.botaoDesativado,
              ]}
              onPress={entrar}
              activeOpacity={0.85}
              disabled={entrando}
            >
              <Text style={styles.botaoTexto}>
                {entrando ? 'Entrando...' : 'Entrar'}
              </Text>

              {!entrando ? (
                <Ionicons
                  name="arrow-forward"
                  size={21}
                  color="#FFFFFF"
                />
              ) : null}
            </TouchableOpacity>

            <View style={styles.divisor}>
              <View style={styles.linha} />
              <Text style={styles.ou}>ou</Text>
              <View style={styles.linha} />
            </View>

            <View style={styles.cadastroArea}>
              <Text style={styles.cadastroTexto}>
                Ainda não tem uma conta?
              </Text>

              <TouchableOpacity
                onPress={() => router.push('/cadastro')}
                activeOpacity={0.7}
                disabled={entrando}
              >
                <Text style={styles.cadastroLink}>
                  Criar conta
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rodape}>
            <Text style={styles.rodapeTexto}>
              Sua conta é protegida pelo Firebase
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
    paddingHorizontal: 24,
    paddingBottom: 30,
  },

  topo: {
    height: 65,
    justifyContent: 'center',
  },

  voltar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEE3DB',
  },

  logoArea: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 34,
  },

  logoIcone: {
    width: 66,
    height: 66,
    borderRadius: 22,
    backgroundColor: '#E76518',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  logo: {
    color: '#292929',
    fontSize: 38,
    fontWeight: '900',
  },

  logoLaranja: {
    color: '#E76518',
  },

  logoSubtitulo: {
    color: '#999',
    fontSize: 13,
    marginTop: 4,
  },

  formulario: {
    width: '100%',
  },

  titulo: {
    color: '#292929',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36,
  },

  descricao: {
    color: '#858585',
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8,
    marginBottom: 28,
  },

  campoArea: {
    marginBottom: 18,
  },

  label: {
    color: '#292929',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
  },

  senhaTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  esqueceu: {
    color: '#E76518',
    fontSize: 13,
    fontWeight: '700',
  },

  inputContainer: {
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7DED7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    color: '#292929',
    fontSize: 16,
    marginLeft: 11,
    paddingVertical: 10,
  },

  erro: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: '#FFF0EC',
    borderWidth: 1,
    borderColor: '#F3C9BF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    marginBottom: 16,
  },

  erroTexto: {
    flex: 1,
    color: '#D94B32',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
    lineHeight: 18,
  },

  botaoEntrar: {
    minHeight: 58,
    borderRadius: 29,
    backgroundColor: '#E76518',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    gap: 10,
  },

  botaoDesativado: {
    opacity: 0.65,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },

  divisor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },

  linha: {
    flex: 1,
    height: 1,
    backgroundColor: '#E7DED7',
  },

  ou: {
    color: '#999',
    fontSize: 13,
    marginHorizontal: 12,
  },

  cadastroArea: {
    alignItems: 'center',
  },

  cadastroTexto: {
    color: '#777',
    fontSize: 14,
  },

  cadastroLink: {
    color: '#E76518',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 7,
  },

  rodape: {
    marginTop: 'auto',
    paddingTop: 30,
    alignItems: 'center',
  },

  rodapeTexto: {
    color: '#AAAAAA',
    fontSize: 11,
  },
});