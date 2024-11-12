export interface IUserForm {
    generalInformations: IUserFormGeneralInformations
    contactInformation: IUserFormContactInformation
    dependentsList: IUserFormDependent[]
}

export interface IUserFormGeneralInformations {
    name: string
    email: string
    country: string
    state: string
    maritalStatus: number
    monthlyIncome: number
    birthDate: Date;
}

export interface IUserFormContactInformation {
    phoneList: IUserFormPhone[]
    addressList: IUserFormAddress[]
}

export interface IUserFormPhone {
    type: number
    typeDescriptions: string
    number: string
}

export interface IUserFormAddress {
    type: number
    typeDescripitions: string
    street: string
    complement: string
    country: string
    state: string
    city: string
}

export interface IUserFormDependent {
    name: string
    age: string
    document: string
}
