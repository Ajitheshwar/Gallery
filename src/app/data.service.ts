import { Injectable } from '@angular/core';
import { AngularFireAuth } from'@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from "rxjs/operators";
import { getStorage, ref, deleteObject } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage : AngularFireStorage, private firebaseAuth : AngularFireAuth, private database : AngularFireDatabase) { }

  imageDetailsList : AngularFireList<any>
  imageDetailsObj !: AngularFireObject<any>;
  isLoggedin : boolean = false;
  
  async logIn(username:string, password:string) {
    await this.firebaseAuth.signInWithEmailAndPassword(username, password)
    .then((res)=>{
      this.isLoggedin = true;
      sessionStorage.setItem('user',JSON.stringify(res.user));
    },
    (err)=>{
      console.log("Error in Login : "+err);
    })
  }

  uploadImage(image){
    var copyimage = {...image}

    var filepath = `images/${copyimage.title}_${new Date().getTime()}`
    const fileRef = this.storage.ref(filepath)
    this.storage.upload(filepath,copyimage.src).snapshotChanges().pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe(url=>{
          copyimage.src=url;
                
          //console.log(copyimage)
          this.imageDetailsList.push(copyimage);  
        })
      })
    ).subscribe();

  }

  initialiseImages(){
    this.imageDetailsList=this.database.list('imageDetails')
  }

  getImagebyId(id){
    return this.database.object('/imageDetails/'+id)
  }

  updateImageDesc(id:any, dsc:any) {
    this.imageDetailsObj = this.database.object('imageDetails/'+id);
    this.imageDetailsObj.update({
      description : dsc
    })
  }

  deleteImageDetails(id : any) {
    this.imageDetailsObj = this.database.object('imageDetails/'+id);
    this.imageDetailsObj.remove();
  }

  deleteImage(url : any) {
    const storage = getStorage();
    const desertRef = ref(storage, url);
    deleteObject(desertRef).then(() => {
    }).catch((error) => {
      console.log("Error in deletion of Image from Cloud",error);
    });
  }


   updateComment(id, comments){
     this.imageDetailsObj = this.database.object('imageDetails/'+id);
     this.imageDetailsObj.update({
       comments : comments
     })
  }
}
