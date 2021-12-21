import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  constructor(private ds : DataService, private router : Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user')==null)
    {
      this.router.navigateByUrl('');
    }
  }

  image = {src : "", title :"", description : "", comments : ["",{}]}
  src="...";
  isSubmitted ;

  selectedImage : any =null;
  onselectFile(e){ 
      if(e.target.files){
        var reader = new FileReader();
        reader.onload=(event : any) =>{
          this.src=event.target.result;
        }
        reader.readAsDataURL(e.target.files[0])
        this.selectedImage = e.target.files[0]
        this.image.src=this.selectedImage
      }
      else
      {
        this.selectedImage = null;
        this.src="...";
      }

      
    if(sessionStorage.getItem('user')==null)
    {
      this.router.navigateByUrl("");
    }
  }
  
  async onSubmit(ref){
    this.isSubmitted = true;

    if(ref.form.valid)
    {
      this.image.title=ref.value.imageTitle;
      this.image.description = ref.value.imageDescription;
      await this.ds.uploadImage(this.image);
      this.isSubmitted = false;
      alert("Image Added Successfully!!!")
    }
    else
    {
      console.log("Error in ref.form.valid")
    }
    ref.reset(); 
    this.src='...'
  }

  routeToAdmin(){
    this.router.navigateByUrl("/admin");
  }
}
