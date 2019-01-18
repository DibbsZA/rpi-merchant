export class AccountNo {
    accountNo?: string;
    accountAlias?: string;
    uid?: string;
    id?: string;
    default?: boolean;

    constructor(accountData) {

        if (accountData.accountNo != undefined) {
            this.accountNo = accountData.accountNo;
        }
        if (accountData.accountAlias != undefined) {
            this.accountAlias = accountData.accountAlias;
        }
        if (accountData.uid != undefined) {
            this.uid = accountData.uid;
        }
        if (accountData.id != undefined) {
            this.id = accountData.id;
        }
        if (accountData.default != undefined) {
            this.default = accountData.default;
        }
    }
}
