import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

interface UsuarioInfo {
  name: string;
  fullName: string;
  profileImage: string;
  birthDate: string;
  location: string;
  description: string;
  email: string;
  phone: string;
}

interface UsuarioPost {
  id: number;
  petName: string;
  petImage: string;
  description: string;
  date: string;
  likes: number;
  status: 'available' | 'adopted';
}

interface UsuarioActivity {
  id: number;
  type: 'comment' | 'like' | 'post';
  description: string;
  date: string;
  targetPost?: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class UsuariosPage implements OnInit {
  selectedFilter: string = 'todo';

  userInfo: UsuarioInfo = {
    name: 'María González',
    fullName: 'María Alejandra González Rodríguez',
    profileImage: 'https://ionicframework.com/docs/img/demos/avatar.svg',
    birthDate: '15 de Marzo, 1995',
    location: 'Santiago, Chile',
    description: 'Amante de los animales 🐕🐱 Voluntaria en refugios locales. Busco dar amor y hogar a mascotas que lo necesiten.',
    email: 'maria.gonzalez@email.com',
    phone: '+56 9 1234 5678'
  };

  posts: UsuarioPost[] = [
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

  activities: UsuarioActivity[] = [
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
    console.log('UsuariosPage initialized');
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones de Usuario',
      buttons: [
        {
          text: 'Enviar Mensaje',
          icon: 'chatbubble-outline',
          handler: () => { this.sendMessage(); }
        },
        {
          text: 'Info de Contacto',
          icon: 'information-circle-outline',
          handler: () => { this.showContactInfo(); }
        },
        {
          text: 'Denunciar Usuario',
          icon: 'flag-outline',
          role: 'destructive',
          handler: () => { this.reportUser(); }
        },
        {
          text: 'Bloquear Usuario',
          icon: 'ban-outline',
          role: 'destructive',
          handler: () => { this.blockUser(); }
        },
        { text: 'Cancelar', icon: 'close', role: 'cancel' }
      ]
    });
    await actionSheet.present();
  }

  async sendMessage() {
    const alert = await this.alertController.create({
      header: 'Enviar Mensaje',
      inputs: [{ name: 'message', type: 'textarea', placeholder: 'Escribe tu mensaje...' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Enviar', handler: (data) => { if (data.message) { console.log('Mensaje enviado:', data.message); this.showToast('Mensaje enviado correctamente'); } } }
      ]
    });
    await alert.present();
  }

  async showContactInfo() {
    const alert = await this.alertController.create({
      header: 'Información de Contacto',
      message: `
        <strong>Email:</strong> ${this.userInfo.email}<br>
        <strong>Teléfono:</strong> ${this.userInfo.phone}<br>
        <strong>Ubicación:</strong> ${this.userInfo.location}
      `,
      buttons: ['OK']
    });
    await alert.present();
  }

  async reportUser() {
    const alert = await this.alertController.create({
      header: 'Denunciar Usuario',
      inputs: [{ name: 'reason', type: 'text', placeholder: 'Motivo de la denuncia' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Enviar', handler: (data) => { if (data.reason) { console.log('Usuario denunciado por:', data.reason); this.showToast('Denuncia enviada'); } } }
      ]
    });
    await alert.present();
  }

  async blockUser() {
    const alert = await this.alertController.create({
      header: 'Bloquear Usuario',
      message: '¿Estás seguro que quieres bloquear a este usuario?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Bloquear', role: 'destructive', handler: () => this.showToast('Usuario bloqueado') }
      ]
    });
    await alert.present();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({ message, duration: 2000, position: 'bottom' });
    await toast.present();
  }

  onFilterChange(_event: any) {}

  getFilteredContent() {
    return {
      showInfo: this.selectedFilter === 'todo' || this.selectedFilter === 'informacion',
      showPosts: this.selectedFilter === 'todo' || this.selectedFilter === 'publicaciones',
      showActivity: this.selectedFilter === 'todo' || this.selectedFilter === 'actividad'
    };
  }

  getActivityIcon(type: UsuarioActivity['type']) {
    switch (type) {
      case 'like': return 'heart';
      case 'comment': return 'chatbubble-ellipses';
      case 'post': return 'create';
    }
  }
}
