import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  constructor(private router : Router, private ds : DataService, private ar : ActivatedRoute) { }

  ngOnInit(): void {

    this.url=this.ar.snapshot.url[0].path
    this.ds.initialiseImages(this.url)
    this.ds.imageDetailsList.snapshotChanges().subscribe(
      list => {
        this.imageDetailsList=[]
        list.forEach(item =>{
          let a = item.payload.val()
          a['key']=item.key;
          this.imageDetailsList.push(a);
        })
      }
    )
    if(sessionStorage.getItem('user')==null)
    {
      this.login=false;
    }
    else
    {
      this.login=true;
    }
  }

  url 
  login
  imageDetailsList : any[];

  navigateToAdmin()
  {
    this.router.navigateByUrl("/admin")
  }
  routeToImage(id){
    this.router.navigateByUrl(`${this.url}/${id}`);
  }

}
