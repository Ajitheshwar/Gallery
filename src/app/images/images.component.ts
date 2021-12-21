import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  constructor(private router : Router, private ds : DataService) { }

  ngOnInit(): void {
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

  login
  imageDetailsList : any[];

  navigateToAdmin()
  {
    this.router.navigateByUrl("/admin")
  }
  routeToImage(id){
    this.router.navigateByUrl('/'+id);
  }

}
