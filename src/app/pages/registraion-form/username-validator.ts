import { AbstractControl } from '@angular/forms';

let userIds = ["Aishik","Sudeshna,","Santodeb"];

export function ValidateUsername(control: AbstractControl) {
    
    let flag = 0;
      for(let i=0; i<userIds.length; i++) {
      if(control.value.toString() === userIds[i]) {
        flag = 1;
        break;
      }
    }
    if(flag===0)
    return { validUrl: true };
    return null;
    }
    
  