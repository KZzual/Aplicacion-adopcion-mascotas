import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

interface UserInfo {
  name: string;
  fullName: string;
  profileImage: string;
  birthDate: string;
  location: string;
  description: string;
  email: string;
  phone: string;
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

  userInfo: UserInfo = {
    name: 'María González',
    fullName: 'María Alejandra González Rodríguez',
    profileImage: 'https://ionicframework.com/docs/img/demos/avatar.svg',
    birthDate: '15 de Marzo, 1995',
    location: 'Santiago, Chile',
    description: 'Amante de los animales 🐕🐱 Voluntaria en refugios locales. Busco dar amor y hogar a mascotas que lo necesiten.',
    email: 'maria.gonzalez@email.com',
    phone: '+56 9 1234 5678'
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
    private readonly router: Router
  ) { }

  ngOnInit() {
    // Inicialización del componente - cargar datos del perfil si es necesario
    console.log('ProfilePage initialized');
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Editar perfil',
          icon: 'create-outline',
          handler: () => {
            this.editProfile();
          }
        },
        {
          text: 'Configuración',
          icon: 'settings',
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
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
          value: this.userInfo.name
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descripción',
          value: this.userInfo.description
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
            if (data.name && data.description) {
              this.userInfo.name = data.name;
              this.userInfo.description = data.description;
              this.showToast('Perfil actualizado correctamente');
            }
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
}
