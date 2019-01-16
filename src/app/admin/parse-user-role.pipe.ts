import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseUserRole'
})
export class ParseUserRolePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
