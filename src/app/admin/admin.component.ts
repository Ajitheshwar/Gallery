import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router :Router, private ds : DataService) { }

  imageDetailsList : any[];
  

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
      this.router.navigateByUrl("");
    }
  }


  routeToAdd(){
    this.router.navigateByUrl("/add")
  }

  routeToAdminImage(index){
    //console.log(index)
    this.router.navigateByUrl("/admin/"+index);
  }
}
