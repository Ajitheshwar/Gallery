import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { AngularFireAuth } from'@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private router : Router, private ds : DataService, private firebaseAuth : AngularFireAuth){}
  ngOnInit(): void { 
    if(sessionStorage.getItem('user')==null)
    {
      this.login = false;
    }
    else
    {
      this.login=true;
    }
  }

  login 

  async onLogin(ref){
    let userObj = ref.value;
    //console.log(userObj);
    await this.ds.logIn(ref.value.Username, ref.value.Password);
    if(sessionStorage.getItem('user') !== null) {
      //navigate to admin component
      this.router.navigateByUrl("/admin");
      let closeModal = document.getElementById("closeButton")
      closeModal.click()
      this.login=true;
    }
    else{
      alert("Invalid User Credentials");
    }
  }

  async onLogin1(ref){
    let userObj = ref.value;
    //console.log(userObj);
    await this.ds.logIn(ref.value.Username, ref.value.Password);
    if(sessionStorage.getItem('user') !== null) {
      //navigate to admin component
      this.router.navigateByUrl("/admin");
      let closeModal = document.getElementById("closeButton")
      closeModal.click()
      this.login=true;
    }
    else{
      alert("Invalid User Credentials");
    }
  }
  logout(){
    this.firebaseAuth.signOut();
    sessionStorage.removeItem('user');
    this.router.navigateByUrl("/");
    this.login=false;
  }

}
