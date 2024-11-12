import { inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/user/user.interface";
import { PhoneList } from "../../types/phone-list";
import { AddressList } from "../../types/address-list";
import { Dependentslist } from "../../types/dependents-list";
import { convertPtBrDateToDateObj } from "../../utils/convert-pt-br-date-to-date-obj";
import { preparePhoneList } from "../../utils/prepare-phone-list";
import { PhoneTypeEnum } from "../../enums/phone-type.enum";
import { prepareAddressList } from "../../utils/prepare-address-list";
import { requiredAddressValidator } from "../../utils/user-form-validators/required-address-validator";
import { IDependent } from "../../interfaces/user/dependent.interface";
import { UserFormRawValueService } from "../../services/user-form-raw-value.service";

export class userFormController {
    userForm!: FormGroup;

    private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    private readonly _fb = inject(FormBuilder);
    private readonly _userFormRawValueService = inject(UserFormRawValueService)

    constructor() {
        this.createUserForm();

        this.watchUserFormValueChangesAndUpadteService();
    }

    get generalInformations(): FormGroup {
        return this.userForm.get('generalInformations') as FormGroup;
    }

    get contactInformation(): FormArray {
        return this.userForm.get('contactInformation') as FormArray;
    }

    get phoneList(): FormArray {
        return this.userForm.get('contactInformation.phoneList') as FormArray;
    }

    get addressList(): FormArray {
        return this.userForm.get('contactInformation.addressList') as FormArray;
    }

    get dependentsList(): FormArray {
        return this.userForm.get('dependentsList') as FormArray;
    }

    get generalInformationValid(): boolean {
        return this.generalInformations.valid;
    }

    get contactInformationValid(): boolean {
        return this.contactInformation.valid;
    }

    get dependentsListValid(): boolean {
        return this.dependentsList.valid;
    }

    fulfillUserForm(user: IUser) {

        this.resetUserForm();

        this.fulfillGeneralInformations(user);

        this.fulfillPhoneList(user.phoneList);

        this.fufillAddressList(user.addressList);

        this.fufillDependentsList(user.dependentsList);

        this.userForm.markAllAsTouched();
        this.userForm.updateValueAndValidity();

    }

    addDependent(){
        this.dependentsList.push(this.createDependentGroup(null));

        this.dependentsList.markAsDirty();
    }

    removeDependent(dependentIndex: number){
        this.dependentsList.removeAt(dependentIndex);

        this.dependentsList.markAsDirty();
    }

    private createDependentGroup(dependent: IDependent | null) {
        if(!dependent) {
            return this._fb.group({
                name: ['', Validators.required],
                age: ['', Validators.required],
                document: ['', Validators.required],
            });
        }

        return this._fb.group({
            name: [dependent.name, Validators.required],
            age: [dependent.age.toString(), Validators.required],
            document: [dependent.document.toString(), Validators.required],
        });
    }

    private resetUserForm(){
        //resolução do bug de um formulario ficar junto do outro, com esse reset se eu clicar em um so aparece ele e nao o outro tbm
        this.userForm.reset();

        this.generalInformations.reset();

        this.phoneList.reset();
        this.phoneList.clear();

        this.addressList.reset();
        this.addressList.clear();

        this.dependentsList.reset();
        this.dependentsList.clear();
    }

    private fufillDependentsList(userDependentsList: Dependentslist){
        userDependentsList.forEach((dependent) => {
            this.dependentsList.push(this.createDependentGroup(dependent))
        })
    }

    private fufillAddressList(userAddressList: AddressList) {
        prepareAddressList(userAddressList, false, (address) => {
            this.addressList.push(this._fb.group({
                type: [address.type],
                typeDescripitions: [{ value: address.typeDescription, disabled: true }],
                street: [address.street],
                complement: [address.complement],
                country: [address.country],
                state: [address.state],
                city: [address.city],

            }, {
                validators: requiredAddressValidator,
            }));
        })
    }

    private fulfillPhoneList(userPhoneList: PhoneList) {
        preparePhoneList(userPhoneList, false,(phone) => {
            const phoneValidators = phone.type === PhoneTypeEnum.EMERGENCY ? [] : [Validators.required];
            this.phoneList.push(this._fb.group({
                type: [phone.type],
                typeDescriptions: [phone.typeDescriptions],
                number: [phone.phoneNumber, phoneValidators],
            }))
        });

    }

    private fulfillGeneralInformations(user: IUser) {
        const newUser = {
            ...user,
            birthDate: convertPtBrDateToDateObj(user.birthDate),
        };
        this.generalInformations?.patchValue(newUser);
    }

    private createUserForm() {
        this.userForm = this._fb.group({
            generalInformations: this._fb.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
                country: ['', Validators.required],
                state: ['', Validators.required],
                maritalStatus: [null, Validators.required],
                monthlyIncome: [null, Validators.required],
                birthDate: [null, Validators.required],
            }),

            contactInformation: this._fb.group({
                phoneList: this._fb.array([]),
                addressList: this._fb.array([]),
            }),

            dependentsList: this._fb.array([]),
        })
    }

    private watchUserFormValueChangesAndUpadteService() {
        this.userForm.valueChanges.subscribe(() => 
            this._userFormRawValueService.userFormRawValueService = this.userForm.getRawValue());
    }

}