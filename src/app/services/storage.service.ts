import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private st: AngularFireStorage
  ) { }

  uploadImg(path: string, data: any){
    return this.st.upload(path,data)
  }
  getImgUrl(path: string){
    return this.st.ref(path).listAll()
  }

  deleteImg(path: string){
    return this.st.ref(path).listAll().subscribe(res => {
      res.items.forEach(item => {
        item.delete()
      })
    })
  }
}
