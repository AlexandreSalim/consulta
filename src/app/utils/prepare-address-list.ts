import { AddressTypeEnum } from "../enums/address-type.enum";
import { IAddressToDisplay } from "../interfaces/address-to-display.interface";
import { IAddress } from "../interfaces/user/address.interface";
import { AddressList } from "../types/address-list";
import { addressTypeDescriptionMap } from "./address-type-description-map";

export const prepareAddressList = (originalUserAddresList: AddressList, isDisplayAddress: boolean, callbak: (address: IAddressToDisplay) => void) => {
    Object.keys(addressTypeDescriptionMap).map(Number).forEach((addressType: number) => {
        const addressFound = originalUserAddresList.find((userAddress) => userAddress.type === addressType);
  
        let address = {} as IAddressToDisplay;

        if(isDisplayAddress){
            address = returnAddresToDisplay(addressFound, addressType);
        } else {
            address = returnAddresToEdit(addressFound, addressType);
        }

        callbak({
            ...address,
        })
      })
}

const returnAddresToDisplay = (address: IAddress | undefined, addressType: number): IAddressToDisplay  =>{
    if(!address){
      return {
        typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
        type: addressType,
        street: '-',
        complement: '-',
        country: '-',
        state: '-',
        city: '-',
      }
    };

    return {
      typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
      ...address,
    }
  }

const returnAddresToEdit = (address: IAddress | undefined, addressType: number): IAddressToDisplay  =>{
    if(!address){
      return {
        typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
        type: addressType,
        street: '',
        complement: '',
        country: '',
        state: '',
        city: '',
      }
    };

    return {
      typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
      ...address,
    }
  }