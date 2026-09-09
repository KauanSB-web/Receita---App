import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.fechar}
            onPress={() => router.back()}
          >
            <Ionicons
              name="close"
              size={25}
              color="#333"
            />
          </TouchableOpacity>

          <Text style={styles.titulo}>
            Meu Receitaí
          </Text>

          <View style={styles.espaco} />
        </View>

        <View style={styles.perfil}>
          <View style={styles.avatar}>
            <Ionicons
              name="person"
              size={45}
              color="#E76518"
            />
          </View>

          <Text style={styles.nome}>
            Olá! 👋
          </Text>

          <Text style={styles.subtitulo}>
            Organize suas receitas favoritas
          </Text>
        </View>

        <View style={styles.menu}>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/favoritos')}
            activeOpacity={0.8}
          >
            <View style={styles.icone}>
              <Ionicons
                name="heart"
                size={24}
                color="#E76518"
              />
            </View>

            <View style={styles.menuTexto}>
              <Text style={styles.menuTitulo}>
                Meus favoritos
              </Text>

              <Text style={styles.menuSubtitulo}>
                Veja as receitas que você salvou
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#C8C8C8"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
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
                Preferências do aplicativo
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#C8C8C8"
            />
          </TouchableOpacity>

        </View>

        <View style={styles.logoArea}>
          <Text style={styles.logo}>
            Receitaí 🍴
          </Text>

          <Text style={styles.logoSubtitulo}>
            Receitas feitas para você
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9F4',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFF9F4',
  },

  header: {
    height: 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  fechar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEE3DB',
  },

  espaco: {
    width: 44,
  },

  titulo: {
    color: '#292929',
    fontSize: 20,
    fontWeight: '800',
  },

  perfil: {
    alignItems: 'center',
    paddingTop: 35,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF0E7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#F5D7C5',
  },

  nome: {
    color: '#292929',
    fontSize: 25,
    fontWeight: '800',
    marginTop: 18,
  },

  subtitulo: {
    color: '#888',
    fontSize: 15,
    marginTop: 5,
  },

  menu: {
    paddingHorizontal: 20,
    marginTop: 38,
    gap: 12,
  },

  menuItem: {
    minHeight: 82,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E9E2DC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  icone: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#FFF1E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuTexto: {
    flex: 1,
    marginLeft: 13,
  },

  menuTitulo: {
    color: '#292929',
    fontSize: 16,
    fontWeight: '800',
  },

  menuSubtitulo: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },

  logoArea: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingBottom: 30,
  },

  logo: {
    color: '#E76518',
    fontSize: 24,
    fontWeight: '900',
  },

  logoSubtitulo: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
});
