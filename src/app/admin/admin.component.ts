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
    
    this.path="images"
    this.ds.initialiseImages(this.path);
    this.initialiseImageDetailsList()

    if(sessionStorage.getItem('user')==null)
    {
      this.router.navigateByUrl("");
    }
  }

  path ;

  initialiseImageDetailsList()
  {
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
    
  }

  onClickShowButtons(name)
  {
    this.path=name;
    this.ds.initialiseImages(name)
    this.initialiseImageDetailsList();
  }


  routeToAdd(){
    this.router.navigateByUrl("/add")
  }

  routeToAdminImage(index){
    //console.log(index)
    this.ds.setPath(this.path);
    this.router.navigateByUrl("/admin/"+index);
  }
}
