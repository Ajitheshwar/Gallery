import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddImageComponent } from './add-image/add-image.component';
import { AdminImageDisplayComponent } from './admin-image-display/admin-image-display.component';
import { AdminComponent } from './admin/admin.component';
import { ImageDisplayComponent } from './image-display/image-display.component';
import { ImagesComponent } from './images/images.component';

const routes: Routes = [
  {path : "admin", component : AdminComponent},
  {path : "admin/:id" ,component : AdminImageDisplayComponent},
  {path : "add", component : AddImageComponent},
  {path : "images", component : ImagesComponent},
  {path : ":id" ,component : ImageDisplayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
