import { Component, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, of, Observable } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import { filterOutline, searchOutline, closeOutline, checkmarkOutline, locationOutline, pawOutline, heartOutline, calendarOutline, maleFemaleOutline, checkmarkCircle, arrowForwardOutline, mapOutline } from 'ionicons/icons';

// IMPORTACIÓN CLAVE PARA VIRTUAL SCROLL
import { ScrollingModule } from '@angular/cdk/scrolling';

// ==========================================================
// <-- CORREGIDO: Imports separados correctamente
// ==========================================================

// TIPOS de @ionic/angular (no son componentes)
import { RefresherCustomEvent, InfiniteScrollCustomEvent } from '@ionic/angular';

// COMPONENTES de @ionic/angular/standalone
import {
  IonContent, IonSearchbar, IonButton, IonIcon, IonCard, IonCardContent,
  IonAvatar, IonChip, IonPopover, IonList, IonItem, IonLabel,
  IonSelect, IonSelectOption, IonRange, IonCheckbox, IonText,
  IonRefresher, IonRefresherContent, IonInfiniteScrollContent,
  IonSpinner, IonInfiniteScroll // IonInfiniteScroll estaba duplicado y ahora es solo uno
} from '@ionic/angular/standalone';

// ==========================================================

// --- INTERFACES (Sin cambios) ---
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule, // <-- AÑADIDO
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
    IonText,
    IonRefresher,
    IonRefresherContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSpinner
  ]
})
export class HomePage implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  searchText = '';
  isFilterOpen = false;
  popoverEvent: Event | undefined;
  isLoading = true;

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

  private allMockPets: Pet[] = [];
  petsToDisplay: Pet[] = [];
  private currentPage = 1;
  private readonly POSTS_PER_PAGE = 10;

  constructor(private readonly router: Router) {
    addIcons({filterOutline,mapOutline,closeOutline,locationOutline,pawOutline,heartOutline,calendarOutline,maleFemaleOutline,checkmarkCircle,arrowForwardOutline,searchOutline,checkmarkOutline});
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(ev => {
      if (ev instanceof NavigationEnd) { }
    });

    this.allMockPets = this.generateMockPets(200);
    this.runDataReload();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // --- FUNCIONES DE CARGA DE DATOS ---

  runDataReload(event?: RefresherCustomEvent) {
    this.isLoading = true;
    this.currentPage = 1;

    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }

    this.fetchData(this.currentPage).subscribe(newPets => {
      this.petsToDisplay = newPets;
      this.isLoading = false;
      if (event) {
        event.target.complete();
      }
    });
  }

  handleRefresh(event: RefresherCustomEvent) {
    this.runDataReload(event);
  }

  loadMoreData(event: InfiniteScrollCustomEvent) {
    this.currentPage++;

    this.fetchData(this.currentPage).subscribe(newPets => {
      this.petsToDisplay = [...this.petsToDisplay, ...newPets];
      event.target.complete();

      if (newPets.length < this.POSTS_PER_PAGE) {
        event.target.disabled = true;
      }
    });
  }

  fetchData(page: number): Observable<Pet[]> {
    const searchLower = this.searchText.toLowerCase();

    const filtered = this.allMockPets.filter(pet => {
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

    const startIndex = (page - 1) * this.POSTS_PER_PAGE;
    const endIndex = startIndex + this.POSTS_PER_PAGE;
    const paginatedResults = filtered.slice(startIndex, endIndex);

    return of(paginatedResults).pipe(delay(1000));
  }

  trackByPetId(index: number, pet: Pet): number {
    return pet.id;
  }

  // --- FUNCIONES DE FILTROS ---

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
    this.runDataReload();
  }

  resetFiltersAndSearch(): void {
    this.searchText = '';
    this.resetFilters();
  }

  applyFilters(): void {
    this.isFilterOpen = false;
    this.runDataReload();
  }

  // --- FUNCIONES EXISTENTES ---

  openDetails(pet: Pet): void {
    console.log('Ver detalles de:', pet.name);
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

  // --- GENERADOR DE DATOS SIMULADOS ---

  private generateMockPets(count: number): Pet[] {
    const pets: Pet[] = [];
    const species = ['Perro', 'Gato'];
    const names = ['Max', 'Luna', 'Rocky', 'Mimi', 'Toby', 'Bella', 'Coco', 'Nala'];
    const breeds = ['Labrador', 'Siamés', 'Pastor Alemán', 'Persa', 'Mestizo', 'Bulldog'];
    const locations = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga'];
    const owners = ['Juan Pérez', 'Ana García', 'Carlos Ruiz', 'María López'];

    for (let i = 1; i <= count; i++) {
      const petType = i % 3 === 0 ? 'other' : (i % 2 === 0 ? 'cat' : 'dog');
      const ageInMonths = Math.floor(Math.random() * 60) + 1;
      let ageGroup: 'puppy' | 'adult' | 'senior';
      let age: string;

      if (ageInMonths <= 12) {
        ageGroup = 'puppy';
        age = `${ageInMonths} meses`;
      } else if (ageInMonths <= 48) {
        ageGroup = 'adult';
        age = `${Math.floor(ageInMonths / 12)} años`;
      } else {
        ageGroup = 'senior';
        age = `${Math.floor(ageInMonths / 12)} años`;
      }

      pets.push({
        id: i,
        name: names[i % names.length],
        species: petType === 'dog' ? 'Perro' : (petType === 'cat' ? 'Gato' : 'Conejo'),
        breed: breeds[i % breeds.length],
        age: age,
        ageInMonths: ageInMonths,
        gender: i % 2 === 0 ? 'Hembra' : 'Macho',
        location: `${locations[i % locations.length]}, España`,
        distance: Math.floor(Math.random() * 50) + 1,
        image: `https://picsum.photos/600/400?random=${i}`,
        images: [`https://picsum.photos/600/400?random=${i}`],
        vaccinated: Math.random() > 0.3,
        neutered: Math.random() > 0.2,
        houseTrained: Math.random() > 0.4,
        chipped: Math.random() > 0.6,
        type: petType,
        ageGroup: ageGroup,
        description: 'Descripción simulada de la mascota.',
        publishedDate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)),
        owner: {
          id: `user${i % owners.length}`,
          name: owners[i % owners.length],
          avatar: `https://i.pravatar.cc/150?img=${i % 50}`
        }
      });
    }
    return pets;
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
}
