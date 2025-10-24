import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { LocationPickerComponent } from '../../components/location-picker/location-picker.component';
import { UbicacionMascota, TipoUbicacion, EstadoMascota } from '../../models/mascota.model';
import { MascotasService } from '../../services/mascotas.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

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
    genero: ['macho', Validators.required]
  });

  ubicacionSeleccionada?: UbicacionMascota;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalCtrl: ModalController,
    private readonly mascotas: MascotasService,
    private readonly user: UserService,
    private readonly router: Router
  ) {}

  async abrirSelectorUbicacion() {
    const modal = await this.modalCtrl.create({ component: LocationPickerComponent });
    await modal.present();
    const { data } = await modal.onWillDismiss<UbicacionMascota>();
    if (data) {
      this.ubicacionSeleccionada = data;
    }
  }

  get textoUbicacion(): string {
    if (!this.ubicacionSeleccionada) return 'Seleccionar ubicación';
    let texto = this.ubicacionSeleccionada.direccionTexto || 'Ubicación seleccionada';
    if (this.ubicacionSeleccionada.tipoUbicacion === TipoUbicacion.APROXIMADA && this.ubicacionSeleccionada.radioBusquedaKm) {
      texto += ` (radio ${this.ubicacionSeleccionada.radioBusquedaKm} km)`;
    }
    return texto;
  }

  async submit() {
    if (this.form.invalid || !this.ubicacionSeleccionada) return;
    const usuario = this.user.usuarioActual;
    if (!usuario) return;

    const payload: any = {
      ...this.form.value,
      ubicacion: this.ubicacionSeleccionada,
      idUsuarioRegistra: usuario.uid,
      usuarioEmail: usuario.email ?? null,
      estado: EstadoMascota.DISPONIBLE,
      fechaRegistro: new Date()
    };

    try {
      await this.mascotas.crearMascota(payload);
      await this.router.navigateByUrl('/tabs/historial-posts');
    } catch (e) {
      console.error('Error al crear la mascota', e);
    }
  }
}
