import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { userFormController } from './user-form-controller';
import { CoutriesService } from '../../services/coutries.service';
import { distinctUntilChanged, Subscription, take } from 'rxjs';
import { countriesList } from '../../types/countries-list';
import { StatesService } from '../../services/states.service';
import { StatesList } from '../../types/states-list';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent extends userFormController implements OnInit, OnChanges {
mostarUserForm() {
console.log(this.userForm);
}

  currentTabIndex: number = 0;

  countriesList: countriesList = [];
  statesList: StatesList = [];

  userFormValueChangesSubs!: Subscription

  private readonly _countriesService = inject(CoutriesService);
  private readonly _statesService = inject(StatesService);

  @Input({ required: true }) isInEditMode: boolean = false;
  @Input({ required: true }) userSelected: IUser = {} as IUser;

  @Output('onFormStatusChange') onFormStatusChangeEmitt = new EventEmitter<boolean>();
  @Output('onFormFirstChange') onFormFirstChangeEmitt = new EventEmitter<void>();

  ngOnInit() {
    this.getCountriesList();
    this.onUserFormStatusChange();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentTabIndex = 0;

    const HAS_USER_SELECTED = changes['userSelected'] && Object.keys(changes['userSelected'].currentValue).length > 0;

    if(HAS_USER_SELECTED){
      if(this.userFormValueChangesSubs) this.userFormValueChangesSubs.unsubscribe();
      this.fulfillUserForm(this.userSelected);

      this.onUserFormFirstChange()

      this.getStatesList(this.userSelected.country);
    }
  }

  onCountrySelected(countryName: string) {
    this.getStatesList(countryName);
  }

  mostarForm(){
    console.log(this.userForm)
  }

  private onUserFormFirstChange() {
    this.userFormValueChangesSubs = this.userForm.valueChanges.pipe(take(1)).subscribe(() => this.onFormFirstChangeEmitt.emit());
  }
    
  private onUserFormStatusChange() {
    this.userForm.statusChanges.pipe(distinctUntilChanged()).subscribe(() => this.onFormStatusChangeEmitt.emit(this.userForm.valid));
  } 

  private getStatesList(country: string) {
    this._statesService.getStates(country).pipe(take(1)).subscribe((stateList: StatesList) => {
      this.statesList = stateList;
    })
  }

  private getCountriesList() {
    this._countriesService.getCoutries().pipe(take(1)).subscribe((countriesList: countriesList) => {
      this.countriesList = countriesList;
    });
  }

}
