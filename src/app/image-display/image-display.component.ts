import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})
export class ImageDisplayComponent implements OnInit {

  constructor(private ar : ActivatedRoute, private router : Router,private ds : DataService) { }

  ngOnInit(): void {
    let id=this.ar.snapshot.params.id;
    let path=this.ar.snapshot.url[0].path;
  
    this.ds.getImagebyId(path, id).snapshotChanges().subscribe(
      item =>{ 
        this.image = item.payload.val()
        this.id=item.key
        this.path = path
        //console.log(this.image)
      }
    )
    this.commentClick = false;
    this.submitted = false;
  }

  image;
  path;
  id;
  submitted;
  commentClick 

  buttonComment(){
    this.commentClick = true;
  }

  submitComment(ref){
    this.submitted = true
    this.image.comments.push(ref.value)
    this.ds.updateComment(this.path, this.id,this.image.comments);
  }

  cancel()
  {
    this.commentClick = false;
  }

  routeToHome(){
    this.router.navigateByUrl("/images")
  } 
}
