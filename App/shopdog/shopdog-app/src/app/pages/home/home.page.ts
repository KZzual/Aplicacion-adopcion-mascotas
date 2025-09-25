import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HomePage {
  pets = [
    {
      id: 1,
      name: 'Buddy',
      breed: 'Golden Retriever',
      age: '2 años',
      gender: 'Macho',
      location: 'San Joaquin, Santiago de Chile',
      type: 'dog',
      vaccinated: true,
      neutered: true,
      houseTrained: true,
      color: '#4a90e2'
    },
    {
      id: 2,
      name: 'Luna',
      breed: 'Siames',
      age: '1 año',
      gender: 'Hembra',
      location: 'San Joaquin, Santiago de Chile',
      type: 'cat',
      vaccinated: true,
      neutered: false,
      houseTrained: true,
      color: '#e74c3c'
    }
  ];


  // Filtros
  selectedFilter: string = 'all';
  searchText: string = '';

  // Función para filtrar
  filteredPets() {
    return this.pets.filter(pet => {
      const matchFilter = this.selectedFilter === 'all' || pet.type === this.selectedFilter;
      const matchSearch =
        pet.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        pet.breed.toLowerCase().includes(this.searchText.toLowerCase());
      return matchFilter && matchSearch;
    });
  }

  openDetails(pet: any) {
    console.log('Detalles de la mascota:', pet);
    // Aquí más adelante puedes hacer navegación a una página de detalle
  }
}
