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
      name: 'Cholito',
      breed: 'Golden Retriever',
      age: '2 años',
      gender: 'Macho',
      location: 'San Joaquin, Santiago de Chile',
      type: 'dog',
      vaccinated: true,
      neutered: true,
      houseTrained: true,
      chipped: true,
      color: '#4a90e2'
    },
    {
      id: 2,
      name: 'Lunita',
      breed: 'Siames',
      age: '1 año',
      gender: 'Hembra',
      location: 'San Joaquin, Santiago de Chile',
      type: 'cat',
      vaccinated: true,
      neutered: false,
      houseTrained: true,
      chipped: false,
      color: '#e74c3c'
    }
  ];


  // Filtros
  selectedFilter: string = 'all';
  searchText: string = '';


  getAgeNumber(age: string): number {
    const match = age.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  
  filteredPets() {
    return this.pets.filter(pet => {
      const ageNum = this.getAgeNumber(pet.age);

     
      const matchFilter =
        this.selectedFilter === 'all' ||
        pet.type === this.selectedFilter ||
        (this.selectedFilter === 'puppy' && ageNum <= 1) ||
        (this.selectedFilter === 'adult' && ageNum > 1 && ageNum <= 7) ||
        (this.selectedFilter === 'senior' && ageNum > 7);

      
      const matchSearch =
        pet.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        pet.breed.toLowerCase().includes(this.searchText.toLowerCase());

      return matchFilter && matchSearch;
    });
  }

  openDetails(pet: any) {
    console.log('Detalles de la mascota:', pet);
    
  }

  onFabClick() {
  console.log('FAB presionado');
  // Aquí puedes navegar a otra página o abrir un modal
}

}
