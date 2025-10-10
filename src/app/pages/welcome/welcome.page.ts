import { Component } from '@angular/core';import { Component } from '@angular/core';import { Component } from '@angular/core';import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { Router } from '@angular/router';import { FormsModule } from '@angular/forms';import { CommonModule } from '@angular/common';import { Router } from '@angular/router';



@Component({import { IonicModule } from '@ionic/angular';

  standalone: true,

  selector: 'app-welcome',import { Router } from '@angular/router';import { FormsModule } from '@angular/forms';

  templateUrl: './welcome.page.html',

  styleUrls: ['./welcome.page.scss'],

  imports: [CommonModule, FormsModule, IonicModule]

})@Component({import { IonicModule } from '@ionic/angular';@Component({

export class WelcomePage {

  standalone: true,

  constructor(private readonly router: Router) { }

  selector: 'app-welcome',import { Router } from '@angular/router';  selector: 'app-welcome',

  goToAuth() {

    this.router.navigate(['/auth']);  templateUrl: './welcome.page.html',

  }

  styleUrls: ['./welcome.page.scss'],  templateUrl: './welcome.page.html',

}
  imports: [CommonModule, FormsModule, IonicModule]

})@Component({  styleUrls: ['./welcome.page.scss'],

export class WelcomePage {

  standalone: true,})

  constructor(private readonly router: Router) { }

  selector: 'app-welcome',export class WelcomePage implements OnInit {

  goToAuth() {

    this.router.navigate(['/auth']);  templateUrl: './welcome.page.html',

  }

  styleUrls: ['./welcome.page.scss'],  constructor(private router: Router) { }

}
  imports: [CommonModule, FormsModule, IonicModule]

})  ngOnInit() {

export class WelcomePage {  }



  constructor(private readonly router: Router) { }  goToAuth() {

    this.router.navigate(['/auth']);

  goToAuth() {  }

    this.router.navigate(['/auth']);

  }}


}
