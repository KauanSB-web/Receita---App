const FAVORITOS_KEY = 'receitai_favoritos';

export function obterFavoritos() {
  try {
    const favoritos = localStorage.getItem(FAVORITOS_KEY);
    return favoritos ? JSON.parse(favoritos) : [];
  } catch {
    return [];
  }
}

export function isFavorito(id) {
  const favoritos = obterFavoritos();
  return favoritos.includes(id);
}

export function alternarFavorito(id) {
  const favoritos = obterFavoritos();

  const novoEstado = favoritos.includes(id)
    ? favoritos.filter((favoritoId) => favoritoId !== id)
    : [...favoritos, id];

  localStorage.setItem(
    FAVORITOS_KEY,
    JSON.stringify(novoEstado)
  );

  window.dispatchEvent(new Event('favoritosAtualizados'));

  return novoEstado;
}