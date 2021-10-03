import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {

  transform(val: any, ...args: any[]): any {
    val = val.replace('_', ' ');
    val = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
    return val
  }

}
