import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth';

import { auth } from '../firebase';

export default function ModalPerfil() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<User | null>(null);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    const cancelarObservacao = onAuthStateChanged(
      auth,
      (user) => {
        setUsuario(user);
      }
    );

    return cancelarObservacao;
  }, []);

  const nomeUsuario =
    usuario?.displayName?.trim() ||
    usuario?.email?.split('@')[0] ||
    'Usuário';

  const emailUsuario =
    usuario?.email || 'Você ainda não está conectado';

  const sair = async () => {
    try {
      setSaindo(true);
      await signOut(auth);
      router.replace('/(tabs)');
    } catch (error) {
      console.log('Erro ao sair:', error);
      setSaindo(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>

        {/* CABEÇALHO */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>
              Receita<Text style={styles.logoLaranja}>í</Text>
            </Text>
            <Text style={styles.headerSubtitulo}>
              Minha conta
            </Text>
          </View>

          <TouchableOpacity
            style={styles.fechar}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons
              name="close"
              size={25}
              color="#333333"
            />
          </TouchableOpacity>
        </View>

        {/* PERFIL */}
        <View style={styles.perfilCard}>
          <View style={styles.avatar}>
            <Ionicons
              name="person"
              size={34}
              color="#E76518"
            />
          </View>

          <View style={styles.perfilTextos}>
            <Text
              style={styles.nome}
              numberOfLines={1}
            >
              {nomeUsuario}
            </Text>

            <Text
              style={styles.email}
              numberOfLines={1}
            >
              {emailUsuario}
            </Text>

            {usuario && (
              <View style={styles.status}>
                <View style={styles.statusBolinha} />
                <Text style={styles.statusTexto}>
                  Conta conectada
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* MENU */}
        <View style={styles.menu}>

          {/* LOGIN / CONTA */}
          {!usuario ? (
            <>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push('/login')}
                activeOpacity={0.8}
              >
                <View style={styles.icone}>
                  <Ionicons
                    name="log-in-outline"
                    size={24}
                    color="#E76518"
                  />
                </View>

                <View style={styles.menuTexto}>
                  <Text style={styles.menuTitulo}>
                    Entrar
                  </Text>

                  <Text style={styles.menuSubtitulo}>
                    Acesse sua conta do Receitaí
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color="#C8C8C8"
                />
              </TouchableOpacity>

              <View style={styles.divisor} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push('/cadastro')}
                activeOpacity={0.8}
              >
                <View style={styles.icone}>
                  <Ionicons
                    name="person-add-outline"
                    size={24}
                    color="#E76518"
                  />
                </View>

                <View style={styles.menuTexto}>
                  <Text style={styles.menuTitulo}>
                    Criar conta
                  </Text>

                  <Text style={styles.menuSubtitulo}>
                    Cadastre-se gratuitamente
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color="#C8C8C8"
                />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.menuItem}>
                <View style={styles.icone}>
                  <Ionicons
                    name="person-outline"
                    size={24}
                    color="#E76518"
                  />
                </View>

                <View style={styles.menuTexto}>
                  <Text style={styles.menuTitulo}>
                    Minha conta
                  </Text>

                  <Text style={styles.menuSubtitulo}>
                    Sua conta está conectada
                  </Text>
                </View>
              </View>
            </>
          )}

          <View style={styles.divisor} />

          {/* FAVORITOS */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/favoritos')}
            activeOpacity={0.8}
          >
            <View style={styles.icone}>
              <Ionicons
                name="heart-outline"
                size={24}
                color="#E76518"
              />
            </View>

            <View style={styles.menuTexto}>
              <Text style={styles.menuTitulo}>
                Favoritos
              </Text>

              <Text style={styles.menuSubtitulo}>
                Veja suas receitas salvas
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#C8C8C8"
            />
          </TouchableOpacity>

          <View style={styles.divisor} />

          {/* DICAS */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/dicas')}
            activeOpacity={0.8}
          >
            <View style={styles.icone}>
              <Ionicons
                name="bulb-outline"
                size={24}
                color="#E76518"
              />
            </View>

            <View style={styles.menuTexto}>
              <Text style={styles.menuTitulo}>
                Dicas de cozinha
              </Text>

              <Text style={styles.menuSubtitulo}>
                Aprenda truques para cozinhar melhor
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#C8C8C8"
            />
          </TouchableOpacity>

          <View style={styles.divisor} />

          {/* CONFIGURAÇÕES */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/configuracoes')}
            activeOpacity={0.8}
          >
            <View style={styles.icone}>
              <Ionicons
                name="settings-outline"
                size={24}
                color="#E76518"
              />
            </View>

            <View style={styles.menuTexto}>
              <Text style={styles.menuTitulo}>
                Configurações
              </Text>

              <Text style={styles.menuSubtitulo}>
                Personalize sua experiência
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#C8C8C8"
            />
          </TouchableOpacity>

          {/* SAIR */}
          {usuario && (
            <>
              <View style={styles.divisor} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={sair}
                disabled={saindo}
                activeOpacity={0.8}
              >
                <View style={styles.iconeSair}>
                  <Ionicons
                    name="log-out-outline"
                    size={24}
                    color="#D64545"
                  />
                </View>

                <View style={styles.menuTexto}>
                  <Text style={styles.menuTituloSair}>
                    {saindo ? 'Saindo...' : 'Sair da conta'}
                  </Text>

                  <Text style={styles.menuSubtitulo}>
                    Encerrar sua sessão
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* RODAPÉ */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>
            Receita<Text style={styles.logoLaranja}>í</Text>
          </Text>

          <Text style={styles.footerTexto}>
            Feito para quem ama cozinhar ❤️
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },

  conteudo: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    paddingTop: 14,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: '#222222',
    letterSpacing: -1,
  },

  logoLaranja: {
    color: '#F45D01',
  },

  headerSubtitulo: {
    fontSize: 14,
    color: '#888888',
    marginTop: 2,
  },

  fechar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  perfilCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  perfilTextos: {
    flex: 1,
  },

  nome: {
    fontSize: 20,
    fontWeight: '800',
    color: '#262626',
  },

  email: {
    fontSize: 14,
    color: '#858585',
    marginTop: 4,
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  statusBolinha: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },

  statusTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },

  menu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  menuItem: {
    minHeight: 82,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  icone: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#FFF3EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  iconeSair: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  menuTexto: {
    flex: 1,
    paddingRight: 8,
  },

  menuTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#292929',
  },

  menuTituloSair: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D64545',
  },

  menuSubtitulo: {
    fontSize: 13,
    color: '#858585',
    marginTop: 4,
    lineHeight: 18,
  },

  divisor: {
    height: 1,
    backgroundColor: '#F1F1F1',
    marginLeft: 77,
  },

  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: 24,
  },

  footerLogo: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333333',
  },

  footerTexto: {
    fontSize: 12,
    color: '#999999',
    marginTop: 5,
  },
});