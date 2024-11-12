import { Component, Input } from '@angular/core';
import { Dependentslist } from '../../types/dependents-list';

@Component({
  selector: 'app-dependents-list',
  templateUrl: './dependents-list.component.html',
  styleUrl: './dependents-list.component.scss'
})
export class DependentsListComponent {

  @Input({ required: true }) dependentList: Dependentslist | undefined = [];

}
