# Instrucciones para conectar autenticación y Firestore en la publicación de mascotas

## 1. Asociar publicación al usuario autenticado
- En el método `submit()` de `CrearPublicacionPage`, importa y usa el servicio `UserService` para obtener el usuario actual:

```typescript
constructor(private readonly fb: FormBuilder, private readonly user: UserService) {}

submit() {
  if (this.form.invalid) return;
  const usuario = this.user.usuarioActual;
  if (!usuario) {
    // Mostrar mensaje de error o redirigir a login
    return;
  }
  const datosMascota = {
    ...this.form.value,
    usuarioId: usuario.uid,
    usuarioEmail: usuario.email
  };
  // Aquí llama a MascotasService.crearMascota(datosMascota, imagenFile)
}
```

## 2. Guardar en Firestore
- Usa el servicio `MascotasService` para guardar los datos y la imagen:

```typescript
// En MascotasService
crearMascota(data: any, imagenFile?: File): Promise<any> {
  // ...subida de imagen y guardado en Firestore
}
```

## 3. Proteger rutas
- Ya está implementado el guard `AuthGuard` en las rutas sensibles.

## 4. Notas
- Si quieres mostrar el nombre/email del usuario en la publicación, guárdalo junto con los datos de la mascota.
- Si el usuario no está autenticado, redirige a login o muestra un mensaje.
- Puedes ampliar el guard para roles o permisos si lo necesitas.

---
**Edita el método `submit()` en `CrearPublicacionPage` y el servicio `MascotasService` según estos ejemplos para conectar la lógica completa.**
