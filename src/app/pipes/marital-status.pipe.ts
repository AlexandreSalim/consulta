import { Pipe, PipeTransform } from '@angular/core';
import { MaritalStatusEnum } from '../enums/marital-status.enum';
import { maritalStatusDescriptionsMap } from '../utils/marital-status-descripition-map';

@Pipe({
  name: 'maritalStatus'
})
export class MaritalStatusPipe implements PipeTransform {

  transform(maritalStatus: number | undefined): string {
    return maritalStatus ? maritalStatusDescriptionsMap[maritalStatus as MaritalStatusEnum] : '';
  }

}
