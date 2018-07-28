import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidateUsername } from './username-validator';
import {Router} from '@angular/router';
import { RegistrationFormService } from './registration-form.service';

@Component({
  selector: 'app-registraion-form',
  templateUrl: './registraion-form.component.html',
  styleUrls: ['./registraion-form.component.css']
})
export class RegistraionFormComponent implements OnInit {

  
  alert = 0;
  registrationForm: FormGroup;
  date = new Date();
  plans = [{id : 1, value : 'Quarterly'}, {id : 2, value : 'Half Yearly'}, {id : 3, value : 'Anually'}];
  occupations = [{id : 1, value : 'Student'}, {id : 2, value : 'Job'}, {id : 3, value : 'Business'}, {id : 4, value : 'Other'}]
  userIds = ["Aishik","Sudeshna,","Santodeb"];

  donarType: any = {
    "firstName" : "", 
      "lastName": "",
      "gender" : "",
      "address": {
          "houseNumber": 0,
          "streetName" : "",
          "city": "",
          "state":"",
          "pincode": 0
      },
      "dateOfBirth": "",
      "contactNo": 0,
      "emailId":"",
      "occupation":""
      }
  
  constructor(private fb: FormBuilder, private router:Router, private registrationFormService:RegistrationFormService) { }

  ngOnInit() {
    this.registrationFormService.getAbout()
    .subscribe(
      res => {
        const response = res;
        console.log(response)
        console.log('Inside res')
      },
    err => {
      console.log(err)
    })
    this.createForm();
  }

  createForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      houseNumber: ['', Validators.required],
      streetName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      emailId:  ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')] ],
      contactNo: ['', Validators.required ],
      plan: ['', Validators.required ],
      occupation: ['', Validators.required ],
      dateOfBirth: [{value: '', disabled: true}, Validators.required]

    });
  }

  resetForm() {
    console.log("sdad")
    this.registrationForm.reset();
  }

  createPayLoad() {
    console.log(this.registrationForm.get('firstName').value)
     this.donarType.firstName = this.registrationForm.get('firstName').value;
     this.donarType.lastName = this.registrationForm.get('lastName').value;
    // this.donarType.gender = this.registrationForm.get('gender').value;
    this.donarType.gender = "Male";
     this.donarType.address.houseNumber = this.registrationForm.get('houseNumber').value;
     this.donarType.address.streetName = this.registrationForm.get('streetName').value;
     this.donarType.address.city = this.registrationForm.get('city').value;
     this.donarType.address.state = this.registrationForm.get('state').value;
     this.donarType.address.pincode = this.registrationForm.get('pincode').value;
     this.donarType.dateOfBirth = this.registrationForm.get('dateOfBirth').value;
     this.donarType.contactNo = this.registrationForm.get('contactNo').value;
     this.donarType.emailId = this.registrationForm.get('emailId').value;
     this.donarType.occupation = this.registrationForm.get('occupation').value;
     return this.donarType;
        
  }

  registerDonor() {
    this.registrationFormService.saveDetails(this.createPayLoad())
    .subscribe(
      res => {
        console.log(res);
      }
    );
  }

  checkUserNameAvailability(event) {
    if(event.target.value.length >= 5) {
      let flag = 0;
      for(let i=0; i<this.userIds.length; i++) {
      if(this.registrationForm.get('userName').value == this.userIds[i]) {
        flag = 1;
        break;
      }
    }
    if(flag === 1) {
      console.log("alert")
      alert("Username already in use");
      this.registrationForm.controls['userName'].setValue('');
    }
    }
    

  }
}
