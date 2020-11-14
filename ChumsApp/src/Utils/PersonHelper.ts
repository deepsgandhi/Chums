import { PersonInterface, ContactInfoInterface } from './ApiHelper';
import { EnvironmentHelper } from '../Components';

export class PersonHelper {
    static getPhotoUrl(person: PersonInterface) {
        return EnvironmentHelper.ContentRoot + person.photo;
    }

    static getAge(birthdate: Date): string {
        if (birthdate !== undefined && birthdate !== null) {
            var ageDifMs = Date.now() - new Date(birthdate).getTime();
            var ageDate = new Date(ageDifMs);
            var years = Math.abs(ageDate.getUTCFullYear() - 1970);
            return years + " years";
        }
        else return "";
    }

    static getDisplayName(firstName: string, lastName: string, nickName: string): string {
        if (nickName !== undefined && nickName !== null && nickName.length > 0) return firstName + ' "' + nickName + '" ' + lastName;
        else return firstName + ' ' + lastName;
    }

    public static compareAddress(address1: ContactInfoInterface, address2: ContactInfoInterface): boolean {
        const displayAddress1: string = this.addressToString(address1);
        const displayAddress2: string = this.addressToString(address2);
        
        if (displayAddress1 !== displayAddress2) {
            return true
        }
        return false
    } 

    public static addressToString(address: ContactInfoInterface): string {
        return `${address.address1} ${address.address2} ${address.city}, ${address.state} ${address.zip}`
    }

}
