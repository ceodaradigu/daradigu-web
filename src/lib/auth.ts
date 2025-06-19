export async function getSession() {
  // ⚠️ Función simulada por ahora. Luego la conectaremos con autenticación real.
  return {
    user: {
      id: 'anonimo',
      name: 'Usuario IA',
    },
  }
}
