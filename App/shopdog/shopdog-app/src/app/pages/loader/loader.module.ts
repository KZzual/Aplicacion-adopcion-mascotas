import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoaderPageRoutingModule } from './loader-routing.module';

import { LoaderPage } from './loader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoaderPageRoutingModule,
    LoaderPage
  ]
})
export class LoaderPageModule {}
