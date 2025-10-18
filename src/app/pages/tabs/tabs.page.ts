import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
    RouterModule
  ]
})
export class TabsPage {
  constructor() {}
}
