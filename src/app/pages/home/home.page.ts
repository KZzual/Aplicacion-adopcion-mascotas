import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
  IonContent, IonSearchbar, IonSegment, IonSegmentButton,
  IonCard, IonCardContent, IonAvatar, IonChip, IonFab, IonFabButton,
  IonItem, IonInput, IonTextarea, IonBadge, IonTabs, IonTabBar,
  IonTabButton, IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonButtons,
    IonButton, IonIcon, IonContent, IonSearchbar, IonSegment, IonSegmentButton,
    IonCard, IonCardContent, IonAvatar, IonChip, IonFab, IonFabButton,
    IonItem, IonInput, IonTextarea, IonBadge, IonTabs, IonTabBar,
    IonTabButton, IonLabel
  ]
})
export class HomePage {
  currentTab: string = 'home';
  searchText: string = '';
  selectedFilter: string = 'all';

  // Lista de mascotas para la sección home
  pets = [
    {
      id: 1,
      name: 'Max',
      breed: 'Labrador',
      age: '6 meses',
      gender: 'Macho',
      location: 'Madrid',
      image: 'assets/img/dog1.jpg',
      vaccinated: true,
      neutered: false,
      houseTrained: true,
      chipped: true,
      type: 'dog',
      ageGroup: 'puppy',
      owner: {
        name: 'Juan',
        avatar: 'assets/img/avatar1.png',
      }
    },
    {
      id: 2,
      name: 'Luna',
      breed: 'Siamesa',
      age: '1 año',
      gender: 'Hembra',
      location: 'Barcelona',
      image: 'assets/img/cat1.jpg',
      vaccinated: true,
      neutered: true,
      houseTrained: true,
      chipped: true,
      type: 'cat',
      ageGroup: 'adult',
      owner: {
        name: 'Ana',
        avatar: 'assets/img/avatar2.png',
      }
    },
    {
      id: 3,
      name: 'Rocky',
      breed: 'Pastor Alemán',
      age: '3 años',
      gender: 'Macho',
      location: 'Valencia',
      image: 'assets/img/dog2.jpg',
      vaccinated: true,
      neutered: true,
      houseTrained: true,
      chipped: true,
      type: 'dog',
      ageGroup: 'adult',
      owner: {
        name: 'Carlos',
        avatar: 'assets/img/avatar3.png',
      }
    }
  ];

  // Lista de posts del usuario para historial
  userPosts = [
    {
      title: 'Max - Labrador en adopción',
      petImage: 'assets/img/dog1.jpg',
      petName: 'Max',
      status: 'available',
      description: 'Cachorro juguetón busca hogar amoroso.',
      date: '2025-10-10'
    },
    {
      title: 'Luna - Gata adoptada',
      petImage: 'assets/img/cat1.jpg',
      petName: 'Luna',
      status: 'adopted',
      description: 'Gatita tranquila y cariñosa.',
      date: '2025-10-09'
    }
  ];

  // Nuevo post para formulario de publicación
  newPost = {
    name: '',
    description: ''
  };

  // Lista de conversaciones para mensajes
  conversations = [
    {
      id: 1,
      name: 'Carlos',
      avatar: 'assets/img/avatar3.png',
      lastMessage: '¿Aún está disponible Max?',
      time: '10:00',
      unreadCount: 2
    },
    {
      id: 2,
      name: 'Lucía',
      avatar: 'assets/img/avatar4.png',
      lastMessage: 'Gracias por la información.',
      time: '09:30',
      unreadCount: 0
    }
  ];

  constructor() {}

  // Método para obtener el título de la página actual
  getCurrentPageTitle(): string {
    switch (this.currentTab) {
      case 'home':
        return 'PetHub - Adopciones';
      case 'historial-posts':
        return 'Mis Publicaciones';
      case 'post-view':
        return 'Publicar Mascota';
      case 'mensajes':
        return 'Mensajes';
      default:
        return 'PetHub';
    }
  }

  // Método para navegar al perfil
  goToProfile(): void {
    // Aquí iría la lógica de navegación al perfil
    console.log('Navegando al perfil...');
  }

  // Método para filtrar mascotas según búsqueda y filtro seleccionado
  filteredPets(): any[] {
    let filtered = this.pets;

    // Filtrar por texto de búsqueda
    if (this.searchText && this.searchText.trim() !== '') {
      const searchLower = this.searchText.toLowerCase();
      filtered = filtered.filter(pet =>
        pet.name.toLowerCase().includes(searchLower) ||
        pet.breed.toLowerCase().includes(searchLower) ||
        pet.location.toLowerCase().includes(searchLower)
      );
    }

    // Filtrar por tipo seleccionado
    if (this.selectedFilter && this.selectedFilter !== 'all') {
      filtered = filtered.filter(pet => {
        switch (this.selectedFilter) {
          case 'dog':
            return pet.type === 'dog';
          case 'cat':
            return pet.type === 'cat';
          case 'puppy':
            return pet.ageGroup === 'puppy';
          case 'adult':
            return pet.ageGroup === 'adult';
          default:
            return true;
        }
      });
    }

    return filtered;
  }

  // Método para cambiar de tab
  setCurrentTab(tab: string): void {
    this.currentTab = tab;
  }

  // Método para publicar un nuevo post
  publishPost(): void {
    if (this.newPost.name && this.newPost.description) {
      const newUserPost = {
        title: `${this.newPost.name} - En adopción`,
        petImage: 'assets/placeholder.png',
        petName: this.newPost.name,
        status: 'available',
        description: this.newPost.description,
        date: new Date().toISOString().slice(0, 10)
      };

      this.userPosts.unshift(newUserPost);

      // Limpiar el formulario
      this.newPost = {
        name: '',
        description: ''
      };

      // Cambiar a la tab de historial para ver el post publicado
      this.setCurrentTab('historial-posts');
    }
  }

  // Método para abrir conversación
  openConversation(conversation: any): void {
    console.log('Abriendo conversación con:', conversation.name);
    // Aquí iría la lógica para abrir la conversación
  }

  // Método para abrir detalles de mascota
  openDetails(pet: any): void {
    console.log('Abriendo detalles de:', pet.name);
    // Aquí iría la lógica para abrir los detalles
  }

  // Método para el botón flotante
  onFabClick(): void {
    console.log('Botón flotante presionado');
    // Cambiar a la tab de publicar
    this.setCurrentTab('post-view');
  }
}
