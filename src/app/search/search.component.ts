import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 data=[];
 submitted=false;
  submitForm:FormGroup;
  user:any;
  index=0;
  search:any;
  constructor(public fb:FormBuilder, public route:Router, private commonservice:CommonService) { }

  ngOnInit(): void {
   this.data=this.commonservice.get();
   this.submitForm=this.fb.group({
    houseno:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
    ownername:['',[Validators.required,Validators.pattern("^[a-z A-Z]*$")]],
    housesize:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
    numoffloor:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
    landmark:['',[Validators.required,Validators.pattern("^[a-z A-Z]*$")]],
    mobile:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
    latitute:['',[Validators.required,Validators.pattern("^[0-9.0-9]*$")]],
    longitute:['',[Validators.required,Validators.pattern("^[0-9.0-9]*$")]],
  });
}
get f(){return this.submitForm.controls}

Onedit(value, i){
  this.index = i
  console.log(this.index)
  this.submitForm.patchValue({
   houseno:value.houseno,
   ownername:value.ownername,
   housesize:value.housesize,
   numoffloor:value.numoffloor,
   landmark:value.landmark,
   mobile:value.mobile,
   longitute:value.longitute,
   latitute:value.latitute
 })
}

Ondelete(i) {
  this.data.splice(i,1);
  this.commonservice.set(this.data)
}

Onupdate(i){
  this.submitted=true;
  if(this.submitForm.invalid)
  {
    return false;
  }
      this.data[this.index] = this.submitForm.value 
  this.commonservice.set(this.data)
      this.submitted=false;
      this.submitForm.reset();
}

Onhousenosort(){
  this.data.sort((a, b) => (a.houseno > b.houseno) ? 1 : -1 )
}
Ononeernamesort(){
  this.data.sort((a, b) => (a.ownername > b.ownername) ? 1 : -1)
}
Onlatitutesort(){
  this.data.sort((a, b) => (a.latitute > b.latitute) ? 1 : -1)
}
Onlongitutesort(){
  this.data.sort((a, b) => (a.longitute > b.longitute) ? 1 : -1)
}
Onhousesizesort(){
  this.data.sort((a, b) => (a.housesize > b.housesize) ? 1 : -1)
}
Onnumoffloorsort(){
  this.data.sort((a, b) => (a.numoffloor > b.numoffloor) ? 1 : -1)
}
Onlandmarksort(){
  this.data.sort((a, b) => (a.landmark > b.landmark) ? 1 : -1)
}
Onmobilenosort(){
  this.data.sort((a, b) => (a.mobile > b.mobile) ? 1 : -1 )
}


Onsearch(id){
  let array1;
  if(id=="houseno"){
  
     array1=this.data.filter(x=>
      x.houseno===this.search
   )
  }
  if(id=="name"){
    array1=this.data.filter(x=>
     x.ownername===this.search
  )
 }
 if(id=="mobile"){
  array1=this.data.filter(x=>
   x.mobile===this.search
)
}
  this.search=""
  this.data=array1;
  }

refresh(){
  this.data=this.commonservice.get();
}

  signup(){
    this.route.navigate([''])
  }
}
