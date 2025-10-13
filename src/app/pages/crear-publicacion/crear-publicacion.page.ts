import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.page.html',
  styleUrls: ['./crear-publicacion.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class CrearPublicacionPage {
  form = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    especie: ['perro', Validators.required],
    edad: ['', Validators.required],
    genero: ['macho', Validators.required],
    ubicacion: ['', Validators.required]
  });

  constructor(private readonly fb: FormBuilder) {}

  submit() {
    if (this.form.invalid) return;
    // --- INSTRUCCIONES DE INTEGRACIÓN ---
    // 1. Importa UserService y MascotasService en el constructor:
    // constructor(private readonly fb: FormBuilder, private readonly user: UserService, private readonly mascotas: MascotasService) {}
    // 2. Obtén el usuario actual:
    // const usuario = this.user.usuarioActual;
    // if (!usuario) { /* Redirige a login o muestra error */ return; }
    // 3. Prepara los datos:
    // const datosMascota = { ...this.form.value, usuarioId: usuario.uid, usuarioEmail: usuario.email };
    // 4. Llama a MascotasService.crearMascota(datosMascota, imagenFile);
    // 5. Navega a /tabs/historial-posts tras guardar.
    // --- FIN INSTRUCCIONES ---
    console.log('Nueva publicación', this.form.value);
  }
}
