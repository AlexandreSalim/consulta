import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dependents-list-edit',
  templateUrl: './dependents-list-edit.component.html',
  styleUrl: './dependents-list-edit.component.scss'
})
export class DependentsListEditComponent {
  @Input({ required: true }) userForm!: FormGroup;

  @Output('onAddDependent') onAddDependentEmitt = new EventEmitter<void>();
  @Output('onremovedependent') onremovedependentEmitt = new EventEmitter<number>();



  get dependentsList(): FormArray {
    return this.userForm.get('dependentsList') as FormArray;
  }

  addDependent() {
    this.onAddDependentEmitt.emit();
  }

  removeDependent(dependentIndex: number) {
    this.onremovedependentEmitt.emit(dependentIndex);
  }
}
