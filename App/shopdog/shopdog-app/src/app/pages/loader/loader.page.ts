import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [IonicModule], // <--- ¡IMPORTANTE!
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {
  constructor(private router:Router) {}

  ngOnInit() {
    this.router.navigate(['login']);
  }
}

