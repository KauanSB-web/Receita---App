import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import { auth } from '../firebase';

const AVATAR_KEY_PREFIX = '@receitai_avatar_';
const AVATAR_VISITANTE_KEY = '@receitai_avatar_visitante';
const GALERIA_PERGUNTA_KEY = '@receitai_galeria_pergunta_autorizada';

const avatares = [
  '👨‍🍳',
  '👩‍🍳',
  '🧑‍🍳',
  '🥑',
  '🍕',
  '🍓',
  '🧁',
  '🍔',
];

function obterChaveAvatar(usuario: User | null): string {
  if (usuario?.uid) {
    return `${AVATAR_KEY_PREFIX}${usuario.uid}`;
  }

  return AVATAR_VISITANTE_KEY;
}

function ehImagemAvatar(valor: string): boolean {
  return (
    valor.startsWith('file://') ||
    valor.startsWith('content://') ||
    valor.startsWith('ph://') ||
    valor.startsWith('assets-library://')
  );
}

export default function ModalPerfil() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<User | null>(null);
  const [saindo, setSaindo] = useState(false);
  const [avatar, setAvatar] = useState('👨‍🍳');
  const [mostrarAvatares, setMostrarAvatares] = useState(false);

  useEffect(() => {
    const cancelarObservacao = onAuthStateChanged(
      auth,
      async (user) => {
        setUsuario(user);

        try {
          const chave = obterChaveAvatar(user);
          const avatarSalvo = await AsyncStorage.getItem(chave);

          if (avatarSalvo) {
            setAvatar(avatarSalvo);
          } else {
            setAvatar('👨‍🍳');
          }
        } catch (error) {
          console.log('Erro ao carregar avatar:', error);
        }
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

  const selecionarAvatar = async (novoAvatar: string) => {
    try {
      const chave = obterChaveAvatar(usuario);

      await AsyncStorage.setItem(chave, novoAvatar);

      setAvatar(novoAvatar);
      setMostrarAvatares(false);
    } catch (error) {
      console.log('Erro ao salvar avatar:', error);
    }
  };

  const abrirGaleria = async () => {
    try {
      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          'Permissão necessária',
          'Para escolher uma foto de perfil, é necessário permitir o acesso às suas fotos.'
        );

        return;
      }

      // Guarda que o usuário já autorizou a confirmação do Receitaí.
      await AsyncStorage.setItem(
        GALERIA_PERGUNTA_KEY,
        'true'
      );

      const resultado =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
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

      const chave = obterChaveAvatar(usuario);

      await AsyncStorage.setItem(
        chave,
        imagemSelecionada
      );

      setAvatar(imagemSelecionada);
      setMostrarAvatares(false);
    } catch (error) {
      console.log(
        'Erro ao escolher foto da galeria:',
        error
      );

      Alert.alert(
        'Não foi possível escolher a foto',
        'Ocorreu um erro ao acessar a galeria. Tente novamente.'
      );
    }
  };

  const escolherDaGaleria = async () => {
    try {
      const perguntaJaAceita =
        await AsyncStorage.getItem(
          GALERIA_PERGUNTA_KEY
        );

      // Se o usuário já aceitou anteriormente,
      // abre a galeria diretamente.
      if (perguntaJaAceita === 'true') {
        await abrirGaleria();
        return;
      }

      // Primeira vez: pergunta antes de abrir.
      Alert.alert(
        'Acesso à galeria',
        'O Receitaí precisa acessar suas fotos para você escolher uma foto de perfil. Deseja permitir o acesso?',
        [
          {
            text: 'Não',
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              await abrirGaleria();
            },
          },
        ]
      );
    } catch (error) {
      console.log(
        'Erro ao verificar permissão da galeria:',
        error
      );
    }
  };

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
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() =>
              setMostrarAvatares(!mostrarAvatares)
            }
            activeOpacity={0.8}
          >
            <View style={styles.avatar}>
              {ehImagemAvatar(avatar) ? (
                <Image
                  source={{ uri: avatar }}
                  style={styles.avatarImagem}
                />
              ) : (
                <Text style={styles.avatarTexto}>
                  {avatar}
                </Text>
              )}
            </View>

            <View style={styles.camera}>
              <Ionicons
                name="camera"
                size={15}
                color="#FFFFFF"
              />
            </View>
          </TouchableOpacity>

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

        {/* ALTERAR AVATAR */}
        <TouchableOpacity
          style={styles.alterarAvatar}
          onPress={() =>
            setMostrarAvatares(!mostrarAvatares)
          }
          activeOpacity={0.8}
        >
          <View style={styles.alterarIcone}>
            <Ionicons
              name="image-outline"
              size={22}
              color="#E76518"
            />
          </View>

          <View style={styles.alterarTextos}>
            <Text style={styles.alterarTitulo}>
              Alterar foto de perfil
            </Text>

            <Text style={styles.alterarSubtitulo}>
              Escolha uma foto ou avatar para sua conta
            </Text>
          </View>

          <Ionicons
            name={
              mostrarAvatares
                ? 'chevron-up'
                : 'chevron-forward'
            }
            size={21}
            color="#C8C8C8"
          />
        </TouchableOpacity>

        {/* OPÇÕES DE AVATAR */}
        {mostrarAvatares && (
          <View style={styles.seletorAvatar}>
            <Text style={styles.seletorTitulo}>
              Escolha sua foto
            </Text>

            <Text style={styles.seletorSubtitulo}>
              Use uma foto da galeria ou escolha um avatar.
            </Text>

            {/* GALERIA */}
            <TouchableOpacity
              style={[
                styles.botaoGaleria,
                ehImagemAvatar(avatar) &&
                  styles.botaoGaleriaSelecionado,
              ]}
              onPress={escolherDaGaleria}
              activeOpacity={0.8}
            >
              <View style={styles.galeriaIcone}>
                <Ionicons
                  name="images-outline"
                  size={24}
                  color="#E76518"
                />
              </View>

              <View style={styles.galeriaTextos}>
                <Text style={styles.galeriaTitulo}>
                  Escolher da galeria
                </Text>

                <Text style={styles.galeriaSubtitulo}>
                  Use uma foto do seu celular
                </Text>
              </View>

              {ehImagemAvatar(avatar) ? (
                <View style={styles.checkGaleria}>
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color="#FFFFFF"
                  />
                </View>
              ) : (
                <Ionicons
                  name="chevron-forward"
                  size={21}
                  color="#C8C8C8"
                />
              )}
            </TouchableOpacity>

            {/* AVATARES */}
            <Text style={styles.avataresTitulo}>
              Ou escolha um avatar
            </Text>

            <View style={styles.gradeAvatares}>
              {avatares.map((item) => {
                const selecionado = avatar === item;

                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.opcaoAvatar,
                      selecionado &&
                        styles.opcaoAvatarSelecionada,
                    ]}
                    onPress={() =>
                      selecionarAvatar(item)
                    }
                    activeOpacity={0.8}
                  >
                    <Text style={styles.opcaoAvatarTexto}>
                      {item}
                    </Text>

                    {selecionado && (
                      <View style={styles.checkAvatar}>
                        <Ionicons
                          name="checkmark"
                          size={13}
                          color="#FFFFFF"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

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
          )}

          <View style={styles.divisor} />

          {/* FAVORITOS */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              router.push('/(tabs)/favoritos')
            }
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
            onPress={() =>
              router.push('/configuracoes')
            }
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
                    {saindo
                      ? 'Saindo...'
                      : 'Sair da conta'}
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
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },

  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F4D8C5',
    overflow: 'hidden',
  },

  avatarImagem: {
    width: '100%',
    height: '100%',
  },

  avatarTexto: {
    fontSize: 39,
  },

  camera: {
    position: 'absolute',
    right: -3,
    bottom: -2,
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: '#E76518',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
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

  alterarAvatar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    minHeight: 70,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  alterarIcone: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#FFF3EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  alterarTextos: {
    flex: 1,
  },

  alterarTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#292929',
  },

  alterarSubtitulo: {
    fontSize: 12,
    color: '#858585',
    marginTop: 3,
  },

  seletorAvatar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  seletorTitulo: {
    fontSize: 17,
    fontWeight: '800',
    color: '#292929',
  },

  seletorSubtitulo: {
    fontSize: 12,
    color: '#858585',
    marginTop: 3,
    marginBottom: 14,
  },

  botaoGaleria: {
    minHeight: 70,
    borderRadius: 17,
    backgroundColor: '#FFF8F2',
    borderWidth: 1.5,
    borderColor: '#F0E0D3',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  botaoGaleriaSelecionado: {
    backgroundColor: '#FFF0E6',
    borderColor: '#E76518',
  },

  galeriaIcone: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  galeriaTextos: {
    flex: 1,
  },

  galeriaTitulo: {
    fontSize: 15,
    fontWeight: '800',
    color: '#292929',
  },

  galeriaSubtitulo: {
    fontSize: 12,
    color: '#858585',
    marginTop: 3,
  },

  checkGaleria: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E76518',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avataresTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#777777',
    marginTop: 17,
    marginBottom: 10,
  },

  gradeAvatares: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },

  opcaoAvatar: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 17,
    backgroundColor: '#FFF8F2',
    borderWidth: 1.5,
    borderColor: '#F0E0D3',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  opcaoAvatarSelecionada: {
    backgroundColor: '#FFF0E6',
    borderColor: '#E76518',
  },

  opcaoAvatarTexto: {
    fontSize: 32,
  },

  checkAvatar: {
    position: 'absolute',
    right: 3,
    top: 3,
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: '#E76518',
    alignItems: 'center',
    justifyContent: 'center',
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