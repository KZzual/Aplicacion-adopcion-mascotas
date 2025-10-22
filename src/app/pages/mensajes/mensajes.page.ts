import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonBadge, IonIcon, IonCard, IonCardContent, IonAvatar } from "@ionic/angular/standalone";

interface Conversation {
  id: number;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
}

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonCard, IonCardContent, IonAvatar, IonBadge, IonIcon]
})
export class MensajesPage implements OnInit {

  conversations: Conversation[] = [
    {
      id: 1,
      name: 'María González',
      avatar: 'assets/avatar1.png',
      lastMessage: 'Hola, ¿Luna todavía está disponible para adopción?',
      time: '2:30 PM',
      unreadCount: 2
    },
    {
      id: 2,
      name: 'Carlos Ruiz',
      avatar: 'assets/avatar2.png',
      lastMessage: 'Gracias por la información sobre Max',
      time: '1:15 PM',
      unreadCount: 0
    },
    {
      id: 3,
      name: 'Ana Silva',
      avatar: 'assets/avatar3.png',
      lastMessage: '¿Podríamos conocer a Bella este fin de semana?',
      time: '11:45 AM',
      unreadCount: 1
    }
  ];

  constructor() { }

  ngOnInit() {
    // Inicialización si es necesaria
  }

  openConversation(conversation: Conversation) {
    console.log('Abriendo conversación con:', conversation.name);
    // Aquí implementarías la navegación a la conversación individual
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
