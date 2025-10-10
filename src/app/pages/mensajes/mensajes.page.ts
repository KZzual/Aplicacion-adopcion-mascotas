import { Component, OnInit } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";

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

}
