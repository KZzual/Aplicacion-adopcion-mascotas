// INSTRUCCIONES:
// 1. Copia este archivo como 'environment.prod.ts'
// 2. Reemplaza los valores de ejemplo con tus credenciales reales de Firebase para PRODUCCIÓN
// 3. NUNCA subas environment.prod.ts al repositorio (ya está en .gitignore)

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "TU_API_KEY_PRODUCCION_AQUI",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:android:abcdef1234567890"
  }
};
