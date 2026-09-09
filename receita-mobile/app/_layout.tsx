import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from '../firebase';

export default function RootLayout() {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const cancelarObservacao = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCarregando(false);
    });

    return cancelarObservacao;
  }, []);

  /*
   * O Firebase agora é observado globalmente pelo aplicativo.
   *
   * Não vamos bloquear as receitas para usuários deslogados.
   * Assim, qualquer pessoa pode explorar o Receitaí.
   *
   * A variável `usuario` fica disponível aqui para evoluirmos
   * depois para recursos que dependem da conta.
   */
  void usuario;

  if (carregando) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />

      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          title: 'Receitaí',
        }}
      />
    </Stack>
  );
}