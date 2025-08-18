import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-post-view',
  templateUrl: './post-view.page.html',
  styleUrls: ['./post-view.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PostViewPage {}
