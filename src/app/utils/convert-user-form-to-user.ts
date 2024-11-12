import { IUserForm, IUserFormAddress, IUserFormDependent, IUserFormGeneralInformations, IUserFormPhone } from "../interfaces/user-form.interface";
import { IUser } from "../interfaces/user/user.interface";
import { AddressList } from "../types/address-list";
import { Dependentslist } from "../types/dependents-list";
import { PhoneList } from "../types/phone-list";
import { convertDateObjToPtBrDate } from "./convert-date-obj-to-pt-br-date";
import { formatNumber } from "./format-number";

export const convertUserFormToUser = (userForm: IUserForm): IUser => {
    let newUser: Partial<IUser> = {} as IUser;

    newUser = { ...convertGeneralInformations(userForm.generalInformations) }
    newUser.phoneList = [ ...convertPhoneList(userForm.contactInformation.phoneList) ];
    newUser.addressList = [ ...convertAddressList(userForm.contactInformation.addressList) ];
    newUser.dependentsList = [ ...convertDependetsList(userForm.dependentsList) ];

    return newUser as IUser;
};

const convertGeneralInformations =  //esse partial retorna algumas das propriedades do que estiver entre <>; 
    (generalInformations: IUserFormGeneralInformations): Partial<IUser> => {
        return {
            name: generalInformations.name,
            email: generalInformations.email,
            country: generalInformations.country,
            state: generalInformations.state,
            maritalStatus: generalInformations.maritalStatus,
            monthlyIncome: generalInformations.monthlyIncome,
            birthDate: convertDateObjToPtBrDate(generalInformations.birthDate),
        };
};

const convertPhoneList = (phoneList: IUserFormPhone[]): PhoneList => {
    const newUserPhoneList: PhoneList = phoneList
    .map((phone) => ({
        type: phone.type,
        internationalCode: '+' + phone.number.substring(0, 2),
        areaCode: phone.number.substring(2, 4),
        number: formatNumber(phone.number.substring(4)),
    }))
    .filter((phone) => phone.areaCode !== ''); 

    return newUserPhoneList;
}

const convertAddressList = (addressList: IUserFormAddress[]): AddressList => {
    const newUserAddressList: AddressList = addressList
        .map((address) => ({
            type: address.type,
            street: address.street,
            complement: address.complement,
            country: address.country,
            state: address.state,
            city: address.city,
        }))
        .filter((address) => address.street !== '')

    return newUserAddressList;
}

const convertDependetsList = (dependentsList: IUserFormDependent[]): Dependentslist => {
    const newUserDependentsList: Dependentslist = dependentsList.map((dependents) => ({
      name: dependents.name,
      age: Number(dependents.age),
      document: Number(dependents.document),  
    }))

    return newUserDependentsList;
}