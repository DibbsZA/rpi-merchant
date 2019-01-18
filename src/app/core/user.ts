import { AccountNo } from './account';

export class User {
    email: string;
    cashier: true;
    admin: false;
    uid: string;
    accounts?: AccountNo[];
    displayName?: string;
    nickname?: string | null;
    pspId?: string | null;
    phone?: string | null;
    photoURL?: string | '/assets/img/sun-dog.png';
    zapId?: string | null;
    telegramId?: string | null;
    whatsappId?: string | null;

    constructor(authData) {
        this.email = authData.email;
        this.cashier = true;
        this.admin = false;
        this.uid = authData.uid;

        if (authData.displayName != undefined) {
            this.displayName = authData.displayName;
        }
        if (authData.nickname != undefined) {
            this.nickname = authData.nickname;
        }
        if (authData.pspId != undefined) {
            this.pspId = authData.pspId;
        }
        if (authData.phone != undefined) {
            this.phone = authData.phone;
        }
        if (authData.photoURL != undefined) {
            this.photoURL = authData.photoURL;
        }
        if (authData.zapId != undefined) {
            this.zapId = authData.zapId;
        }
        if (authData.telegramId != undefined) {
            this.telegramId = authData.telegramId;
        }
        if (authData.whatsappId != undefined) {
            this.whatsappId = authData.whatsappId;
        }

    }
}
