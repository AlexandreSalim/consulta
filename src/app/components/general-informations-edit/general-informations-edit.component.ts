import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { countriesList } from '../../types/countries-list';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { StatesList } from '../../types/states-list';
import { maritalStatusArray } from '../../utils/marital-status-descripition-map';

@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss'
})
export class GeneralInformationsEditComponent implements OnInit, OnChanges {

  countriesListFilter: countriesList = [];
  statesListFiltered: StatesList = [];

  @Input({ required: true }) userForm!: FormGroup;
  @Input({ required: true }) countriesList: countriesList = [];
  @Input({ required: true }) statesList: StatesList = [];  

  @Output('onCountrySelected') onCountrySelectedEmitt = new EventEmitter<string>();

  ngOnInit() {
    this.watchCountryFormChangesAndFilter();

    this.watchStatesFormChangesAndFilter();
  }

  ngOnChanges(changes: SimpleChanges){
    this.countriesListFilter = this.countriesList;
    
    this.statesListFiltered = this.statesList;
  }

  get maritalStatusArray() {
    return maritalStatusArray;
  }

  get emailControl(): FormControl {
    return this.userForm.get('generalInformations.email') as FormControl;
  }

  get countryControl(): FormControl {
    return this.userForm.get('generalInformations.country') as FormControl;
  }

  get stateControl(): FormControl {
    return this.userForm.get('generalInformations.state') as FormControl;
  }

  onCoutrySelected(event: MatAutocompleteSelectedEvent) {
  this.onCountrySelectedEmitt.emit(event.option.value)
  }

  private watchCountryFormChangesAndFilter() {
    this.countryControl.valueChanges.subscribe(this.filterCountriesList.bind(this));
    // this.countryControl.valueChanges.subscribe((value: string) => this.filterCountriesList(value));
  }

  private filterCountriesList(searchTerm: string) {
    if(!searchTerm) return;
    this.countriesListFilter = this.countriesList.filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
  }

  private watchStatesFormChangesAndFilter() {
    this.stateControl.valueChanges.subscribe(this.filterStatesList.bind(this))
  }

  private filterStatesList(searchTerm: string) {
    if(!searchTerm) return;
    this.statesListFiltered = this.statesList.filter((state) => state.name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
  }
}
