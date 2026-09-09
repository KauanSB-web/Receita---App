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

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');

  const entrar = () => {
    setErro('');

    if (!email.trim() || !senha.trim()) {
      setErro('Preencha o e-mail e a senha.');
      return;
    }

    if (!email.includes('@')) {
      setErro('Digite um e-mail válido.');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    router.replace('/(tabs)');
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
                />
              </View>
            </View>

            <View style={styles.campoArea}>
              <View style={styles.senhaTopo}>
                <Text style={styles.label}>Senha</Text>

                <TouchableOpacity activeOpacity={0.7}>
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
                />

                <TouchableOpacity
                  onPress={() =>
                    setMostrarSenha(!mostrarSenha)
                  }
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
              style={styles.botaoEntrar}
              onPress={entrar}
              activeOpacity={0.85}
            >
              <Text style={styles.botaoTexto}>
                Entrar
              </Text>

              <Ionicons
                name="arrow-forward"
                size={21}
                color="#FFFFFF"
              />
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
              >
                <Text style={styles.cadastroLink}>
                  Criar conta
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
    marginTop: 25,
  },

  logoIcone: {
    width: 67,
    height: 67,
    borderRadius: 22,
    backgroundColor: '#E76518',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  logo: {
    color: '#292929',
    fontSize: 34,
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
    marginTop: 38,
  },

  titulo: {
    color: '#292929',
    fontSize: 27,
    fontWeight: '900',
  },

  descricao: {
    color: '#888',
    fontSize: 15,
    marginTop: 7,
    marginBottom: 28,
  },

  campoArea: {
    marginBottom: 20,
  },

  label: {
    color: '#292929',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },

  senhaTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  esqueceu: {
    color: '#E76518',
    fontSize: 13,
    fontWeight: '700',
  },

  inputContainer: {
    minHeight: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5DDD6',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    color: '#292929',
    fontSize: 15,
    marginLeft: 11,
    paddingVertical: 2,
  },

  erro: {
    minHeight: 46,
    borderRadius: 13,
    backgroundColor: '#FFF0ED',
    borderWidth: 1,
    borderColor: '#F2C8C0',
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  erroTexto: {
    flex: 1,
    color: '#D94B32',
    fontSize: 13,
    marginLeft: 8,
    lineHeight: 18,
  },

  botaoEntrar: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#E76518',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    marginTop: 3,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  divisor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 27,
  },

  linha: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5DDD6',
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
    color: '#888',
    fontSize: 14,
  },

  cadastroLink: {
    color: '#E76518',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 6,
  },

  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingTop: 35,
    gap: 5,
  },

  rodapeTexto: {
    color: '#AAAAAA',
    fontSize: 12,
  },
});
