import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  IonContent, IonSearchbar, IonButton, IonIcon, IonCard, IonCardContent,
  IonAvatar, IonChip, IonPopover, IonList, IonItem, IonLabel,
  IonSelect, IonSelectOption, IonRange, IonCheckbox, IonText
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { filterOutline, searchOutline, closeOutline, checkmarkOutline, locationOutline, pawOutline, heartOutline, calendarOutline, maleFemaleOutline, checkmarkCircle, arrowForwardOutline } from 'ionicons/icons';

// Interfaz para mascota
interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: string;
  ageInMonths: number;
  gender: 'Macho' | 'Hembra';
  location: string;
  distance?: number;
  image: string;
  images?: string[];
  vaccinated: boolean;
  neutered: boolean;
  houseTrained: boolean;
  chipped: boolean;
  type: 'dog' | 'cat' | 'other';
  ageGroup: 'puppy' | 'adult' | 'senior';
  description?: string;
  publishedDate: Date;
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
}

// Interfaz para filtros
interface Filters {
  species: string;
  ageGroup: string;
  gender: string;
  location: string;
  maxDistance: number;
  vaccinated: boolean;
  neutered: boolean;
  houseTrained: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonSearchbar,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonAvatar,
    IonChip,
    IonPopover,
    IonList,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonRange,
    IonCheckbox,
    IonText
  ]
})
export class HomePage implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  searchText = '';
  isFilterOpen = false;
  popoverEvent: Event | undefined;

  filters: Filters = {
    species: 'all',
    ageGroup: 'all',
    gender: 'all',
    location: '',
    maxDistance: 50,
    vaccinated: false,
    neutered: false,
    houseTrained: false
  };

  pets: Pet[] = [
    {
      id: 1,
      name: 'Max',
      species: 'Perro',
      breed: 'Labrador',
      age: '6 meses',
      ageInMonths: 6,
      gender: 'Macho',
      location: 'Madrid, España',
      distance: 5,
      image: 'assets/img/dog1.jpg',
      images: ['assets/img/dog1.jpg'],
      vaccinated: true,
      neutered: false,
      houseTrained: true,
      chipped: true,
      type: 'dog',
      ageGroup: 'puppy',
      description: 'Cachorro juguetón y cariñoso, ideal para familias.',
      publishedDate: new Date(2025, 9, 12),
      owner: {
        id: 'user1',
        name: 'Juan Pérez',
        avatar: 'assets/img/avatar1.png'
      }
    },
    {
      id: 2,
      name: 'Luna',
      species: 'Gato',
      breed: 'Siamés',
      age: '1 año',
      ageInMonths: 12,
      gender: 'Hembra',
      location: 'Barcelona, España',
      distance: 15,
      image: 'assets/img/cat1.jpg',
      images: ['assets/img/cat1.jpg'],
      vaccinated: true,
      neutered: true,
      houseTrained: true,
      chipped: true,
      type: 'cat',
      ageGroup: 'adult',
      description: 'Gata tranquila y elegante, perfecta para apartamentos.',
      publishedDate: new Date(2025, 9, 11),
      owner: {
        id: 'user2',
        name: 'Ana García',
        avatar: 'assets/img/avatar2.png'
      }
    },
    {
      id: 3,
      name: 'Rocky',
      species: 'Perro',
      breed: 'Pastor Alemán',
      age: '3 años',
      ageInMonths: 36,
      gender: 'Macho',
      location: 'Valencia, España',
      distance: 25,
      image: 'assets/img/dog2.jpg',
      images: ['assets/img/dog2.jpg'],
      vaccinated: true,
      neutered: true,
      houseTrained: true,
      chipped: true,
      type: 'dog',
      ageGroup: 'adult',
      description: 'Perro leal y protector, entrenado y obediente.',
      publishedDate: new Date(2025, 9, 10),
      owner: {
        id: 'user3',
        name: 'Carlos Ruiz',
        avatar: 'assets/img/avatar3.png'
      }
    },
    {
      id: 4,
      name: 'Mimi',
      species: 'Gato',
      breed: 'Persa',
      age: '2 años',
      ageInMonths: 24,
      gender: 'Hembra',
      location: 'Sevilla, España',
      distance: 35,
      image: 'assets/img/logoapp1.1.png',
      vaccinated: true,
      neutered: true,
      houseTrained: true,
      chipped: false,
      type: 'cat',
      ageGroup: 'adult',
      description: 'Gata preciosa y mimosa, necesita cuidados especiales.',
      publishedDate: new Date(2025, 9, 9),
      owner: {
        id: 'user4',
        name: 'María López',
        avatar: 'assets/img/avatar1.png'
      }
    }
  ];

  constructor(private readonly router: Router) {
    addIcons({filterOutline,closeOutline,locationOutline,pawOutline,heartOutline,calendarOutline,maleFemaleOutline,checkmarkCircle,arrowForwardOutline,searchOutline,checkmarkOutline});
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        // Lógica adicional si es necesaria
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTimeAgo(publishedDate: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - publishedDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return 'Hoy';
    if (diffInDays === 1) return 'Ayer';
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`;
    return `Hace ${Math.floor(diffInDays / 30)} meses`;
  }

  get filteredPets(): Pet[] {
    return this.pets.filter(pet => {
      const searchLower = this.searchText.toLowerCase();
      const matchesSearch = !this.searchText ||
        pet.name.toLowerCase().includes(searchLower) ||
        pet.breed.toLowerCase().includes(searchLower) ||
        pet.location.toLowerCase().includes(searchLower) ||
        pet.species.toLowerCase().includes(searchLower);

      const matchesSpecies = this.filters.species === 'all' || pet.type === this.filters.species;
      const matchesAgeGroup = this.filters.ageGroup === 'all' || pet.ageGroup === this.filters.ageGroup;
      const matchesGender = this.filters.gender === 'all' || pet.gender === this.filters.gender;
      const matchesDistance = !pet.distance || pet.distance <= this.filters.maxDistance;
      const matchesVaccinated = !this.filters.vaccinated || pet.vaccinated;
      const matchesNeutered = !this.filters.neutered || pet.neutered;
      const matchesHouseTrained = !this.filters.houseTrained || pet.houseTrained;

      return matchesSearch && matchesSpecies && matchesAgeGroup && matchesGender && matchesDistance && matchesVaccinated && matchesNeutered && matchesHouseTrained;
    });
  }

  openFilters(event: Event): void {
    this.popoverEvent = event;
    this.isFilterOpen = true;
  }

  closeFilters(): void {
    this.isFilterOpen = false;
  }

  resetFilters(): void {
    this.filters = {
      species: 'all',
      ageGroup: 'all',
      gender: 'all',
      location: '',
      maxDistance: 50,
      vaccinated: false,
      neutered: false,
      houseTrained: false
    };
  }

  applyFilters(): void {
    this.isFilterOpen = false;
  }

  openDetails(pet: Pet): void {
    console.log('Ver detalles de:', pet.name);
  }
}
