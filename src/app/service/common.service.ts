import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  get(){
   return JSON.parse(localStorage.getItem('key'));
    
  }
  set(data){
    localStorage.setItem('key',JSON.stringify(data));
  }
  // delete(i){
  //     let user = JSON.parse(localStorage.getItem('key'));
 
  //     for(let i = 0; i <user.length; i++) {
  //      if(user[i].text == i) {
  //          user.splice(i, 1);
  //      }
  //   }
  //      localStorage.setItem('key', JSON.stringify(user));
  //   }
}
