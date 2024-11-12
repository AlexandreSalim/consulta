import { MaritalStatusEnum } from "../enums/marital-status.enum";


export const maritalStatusDescriptionsMap: { [key in MaritalStatusEnum]: string } = {
    [MaritalStatusEnum.SINGLE]: 'Solteiro',
    [MaritalStatusEnum.MARRIED]: 'Casado',
    [MaritalStatusEnum.DIVORCED]: 'Divorciado',
};

export const maritalStatusArray = Object.keys(maritalStatusDescriptionsMap).map(Number).map((key) => {
    return { code: key, description: maritalStatusDescriptionsMap[key as MaritalStatusEnum], }
});

// console.log('meritalStatusArray', meritalStatusArray);

// [
//     {code: 1, description: 'Solteiro'}
//     {code: 1, description: 'Solteiro'}
//     {code: 1, description: 'Solteiro'}
// ]