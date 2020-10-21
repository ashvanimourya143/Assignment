import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted=false;
  submitForm:FormGroup;
  user=[];
  public lat;
  public lng;

  constructor(public fb:FormBuilder, private route:Router, private commonservice:CommonService) { }

  ngOnInit(): void {
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
  submitform(){
    this.submitted=true;
  	if(this.submitForm.invalid)
  	{
  		return false;
    }
    let flag=false;
    if (this.user.length>=1) {
      this.user.forEach(e=>{
        if (e.houseno == this.submitForm.value['houseno']) {
          alert("House Number Already registred")
          flag=true;
        } else if(e.mobile==this.submitForm.value['mobile']){
            alert("Mobile Number Already registred")
            flag=true;
          }
      })
      if(flag==false){
        this.user.push(this.submitForm.value)
       }
    } else {

      this.user.push(this.submitForm.value)
    }
     
    this.commonservice.set(this.user)
    this.submitForm.reset();
    this.submitted=false;
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }
        this.submitForm.patchValue({
          latitute:this.lat,
          longitute:this.lng,
        })
      },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    
  }
  search(){
    this.route.navigate(['search'])
  }
}


