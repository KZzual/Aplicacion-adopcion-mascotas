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
      location: 'San Joaquín, Santiago de Chile',
      vaccinated: true,
      neutered: true,
      houseTrained: true,
      color: '#4A90E2'
    },
    {
      id: 2,
      name: 'Princesa',
      breed: 'Siamese',
      age: '1 años',
      gender: 'Hembra',
      location: 'San Joaquín, Santiago de Chile',
      vaccinated: true,
      neutered: true,
      houseTrained: true,
      color: '#FF6B6B'
    }
  ];

  favorites: number[] = [];
  selectedPet: any = null;

  constructor() {}

  openDetails(pet: any) {
    this.selectedPet = pet;
  }

  closeDetails() {
    this.selectedPet = null;
  }

  toggleFavorite(petId: number) {
    if (this.favorites.includes(petId)) {
      this.favorites = this.favorites.filter(id => id !== petId);
    } else {
      this.favorites.push(petId);
    }
  }
}
