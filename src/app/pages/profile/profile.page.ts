import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserProfileService, UserProfileData } from '../../services/user-profile.service';

interface UserInfo {
  fullName: string;
  profileImage: string;
  birthDate?: string;
  location?: string;
  description?: string;
  email: string;
  phone?: string;
}

interface Post {
  id: number;
  petName: string;
  petImage: string;
  description: string;
  date: string;
  likes: number;
  status: 'available' | 'adopted';
}

interface Activity {
  id: number;
  type: 'comment' | 'like' | 'post';
  description: string;
  date: string;
  targetPost?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ProfilePage implements OnInit {
  selectedFilter: string = 'todo';

  @ViewChild('avatarInput') avatarInput?: ElementRef<HTMLInputElement>;

  loading: boolean = true;
  userId: string = '';
  userInfo: UserInfo = {
    fullName: '-',
    profileImage: 'assets/img/logoapp1.1.png',
    email: '-'
  };

  posts: Post[] = [
    {
      id: 1,
      petName: 'Luna',
      petImage: 'https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525',
      description: 'Hermosa gatita buscando hogar. Muy cariñosa y juguetona.',
      date: '2 días atrás',
      likes: 15,
      status: 'available'
    },
    {
      id: 2,
      petName: 'Max',
      petImage: 'https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525',
      description: 'Perrito rescatado, ya encontró su hogar ❤️',
      date: '1 semana atrás',
      likes: 28,
      status: 'adopted'
    }
  ];

  activities: Activity[] = [
    {
      id: 1,
      type: 'like',
      description: 'Te gustó la publicación de "Cholito"',
      date: 'Hace 3 horas',
      targetPost: 'Cholito'
    },
    {
      id: 2,
      type: 'comment',
      description: 'Comentaste en la publicación de "Bella"',
      date: 'Ayer',
      targetPost: 'Bella'
    },
    {
      id: 3,
      type: 'post',
      description: 'Publicaste a "Luna" en adopción',
      date: '2 días atrás'
    }
  ];

  constructor(
    private readonly actionSheetController: ActionSheetController,
    private readonly alertController: AlertController,
    private readonly toastController: ToastController,
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly userProfile: UserProfileService
  ) { }

  ngOnInit() {
    this.initProfile();
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  async logout() {
    try {
      await this.auth.logout();
    } finally {
      this.router.navigate(['/login']);
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Cambiar foto',
          icon: 'camera-outline',
          handler: () => {
            this.triggerAvatarFile();
          }
        },
        {
          text: 'Editar perfil',
          icon: 'create-outline',
          handler: () => {
            this.editProfile();
          }
        },
        {
          text: 'Configuración',
          icon: 'settings-outline',
          handler: () => {
            this.router.navigate(['/configuraciones']);
          }
        },
        {
          text: 'Cerrar Sesión',
          icon: 'log-out-outline',
          role: 'destructive',
          handler: () => {
            this.logout();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async openSettings() {
    // Ya no se usa, la opción de configuración ahora navega a la página de configuraciones
  }

  async editProfile() {
    const alert = await this.alertController.create({
      header: 'Editar Perfil',
      inputs: [
        {
          name: 'fullName',
          type: 'text',
          placeholder: 'Nombre completo',
          value: this.userInfo.fullName
        },
        {
          name: 'birthDate',
          type: 'date',
          placeholder: 'Fecha de nacimiento',
          value: this.userInfo.birthDate || ''
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descripción',
          value: this.userInfo.description
        },
        {
          name: 'phone',
          type: 'tel',
          placeholder: 'Teléfono',
          value: this.userInfo.phone || ''
        },
        {
          name: 'location',
          type: 'text',
          placeholder: 'Ubicación',
          value: this.userInfo.location || ''
        },
        {
          name: 'avatarUrl',
          type: 'url',
          placeholder: 'URL de foto (opcional)',
          value: this.userInfo.profileImage
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const payload: UserProfileData = {
              fullName: data.fullName?.trim(),
              birthDate: data.birthDate || undefined,
              description: data.description?.trim(),
              phone: data.phone?.trim(),
              location: data.location?.trim(),
              avatarUrl: data.avatarUrl?.trim()
            };
            this.applyAndSaveProfile(payload);
          }
        }
      ]
    });
    await alert.present();
  }

  async showPrivacySettings() {
    const alert = await this.alertController.create({
      header: 'Configuración de Privacidad',
      message: 'Gestiona quién puede ver tu perfil y publicaciones',
      buttons: ['OK']
    });
    await alert.present();
  }

  onFilterChange(event: any) {
    this.selectedFilter = event.detail.value;
  }

  getFilteredContent() {
    switch (this.selectedFilter) {
      case 'informacion':
        return { showInfo: true, showPosts: false, showActivity: false };
      case 'publicaciones':
        return { showInfo: false, showPosts: true, showActivity: false };
      case 'actividad':
        return { showInfo: false, showPosts: false, showActivity: true };
      default: // caso por defecto - mostrar el contenido completo
        return { showInfo: true, showPosts: true, showActivity: true };
    }
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'like':
        return 'paw-outline';
      case 'comment':
        return 'chatbubble-outline';
      case 'post':
        return 'add-circle-outline';
      default:
        return 'ellipse-outline';
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  /**
   * Maneja el evento de error al cargar una imagen.
   * Si la imagen original falla, la reemplaza por una imagen local por defecto.
   * @param event Evento de error del elemento img
   */
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/img/logoapp1.1.png';
  }

  private async initProfile() {
    this.loading = true;
    const user = this.auth.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    this.userId = user.uid;

    // Prefill with auth data
    this.userInfo = {
      fullName: user.displayName || '-',
      email: user.email || '-',
      phone: user.phoneNumber || '',
      profileImage: 'assets/img/logoapp1.1.png'
    };

    try {
      const profile = await this.userProfile.getProfile(this.userId);
      if (profile) {
        this.userInfo = {
          fullName: profile.fullName || this.userInfo.fullName,
          email: profile.email || this.userInfo.email,
          phone: profile.phone || this.userInfo.phone,
          birthDate: profile.birthDate,
          location: profile.location,
          description: profile.description,
          profileImage: profile.avatarUrl || this.userInfo.profileImage,
        };
      } else {
        // Initialize minimal profile in Firestore
        await this.userProfile.saveProfile(this.userId, {
          fullName: this.userInfo.fullName,
          email: this.userInfo.email,
          phone: this.userInfo.phone
        });
      }

      // Pequeño delay para mostrar el loader
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (e) {
      console.error('Error loading profile', e);
      const toast = await this.toastController.create({
        message: 'Error al cargar el perfil. Intenta de nuevo.',
        duration: 3000,
        color: 'danger',
        position: 'bottom'
      });
      await toast.present();
    } finally {
      this.loading = false;
    }
  }

  private async applyAndSaveProfile(payload: UserProfileData) {
    try {
      // Apply locally for immediate feedback
      this.userInfo.fullName = payload.fullName || this.userInfo.fullName;
      this.userInfo.description = payload.description ?? this.userInfo.description;
      this.userInfo.phone = payload.phone ?? this.userInfo.phone;
      this.userInfo.birthDate = payload.birthDate ?? this.userInfo.birthDate;
      this.userInfo.location = payload.location ?? this.userInfo.location;
      if (payload.avatarUrl) this.userInfo.profileImage = payload.avatarUrl;

      // Persist
      await this.userProfile.updateProfile(this.userId, {
        fullName: this.userInfo.fullName,
        description: this.userInfo.description,
        phone: this.userInfo.phone,
        birthDate: this.userInfo.birthDate,
        location: this.userInfo.location,
        avatarUrl: this.userInfo.profileImage
      });
      this.showToast('Perfil actualizado correctamente');
    } catch (e) {
      console.error(e);
      this.showToast('❌ Error al actualizar el perfil');
    }
  }

  triggerAvatarFile() {
    this.avatarInput?.nativeElement.click();
  }

  async onAvatarSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      await this.applyAndSaveProfile({ avatarUrl: dataUrl });
    };
    reader.readAsDataURL(file);
    // Reset input
    input.value = '';
  }
}
