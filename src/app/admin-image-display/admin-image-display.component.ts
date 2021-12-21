import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin-image-display',
  templateUrl: './admin-image-display.component.html',
  styleUrls: ['./admin-image-display.component.css']
})
export class AdminImageDisplayComponent implements OnInit {

  constructor(private ar : ActivatedRoute, private ds : DataService, private router : Router) { }

  ngOnInit(): void {
    // We need to get ID from URL 
    let id=this.ar.snapshot.params.id

    this.ds.getImagebyId(id).snapshotChanges().subscribe(
      item =>{ 
        this.image = item.payload.val()
        this.id=item.key
      //  console.log(this.image)
      }
    )
    
    if(sessionStorage.getItem('user')==null)
    {
      this.router.navigateByUrl("");
    }
  }


  id 
  image
  e : boolean = false;

  
  routeToAdmin(){
    this.router.navigateByUrl("/admin");
  }
  
  edit(){
    this.e=true;
  }

  delete(){
    if (window.confirm('Do you want to delete the post ?')) {
      this.ds.deleteImageDetails(this.id);
      this.ds.deleteImage(this.image.src);
      alert("Post deleted Successfully!!!")
      this.router.navigateByUrl("/admin");
    }
  }

  cancel(){
    this.e=false;
  }

  onSubmit(ref){
    if(ref.description == this.image.description) {

      return;
    }
    if(ref.description=="") {
      return;
    }
    this.ds.updateImageDesc(this.id,ref.value.description)
    this.e=false;
  }
}
