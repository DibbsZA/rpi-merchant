export interface Item {
    id?: number;
    name: string;
    price: number;
    item_type: string;
    img_name?: string;
    img_url?: string;
    quantity?: number;
}

export interface Order {
    orderNumber: string;
    items?: Item[];
    cartTotal: number;
    cartNumItems?: number;
    paymentType?: string;   //  'CASH' or 'BIO' or 'RPI'
    paidStatus?: boolean
    paidBy?: string  // ZAPID or EmployeeId or CASH
}

export class Upload {
    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date();

    constructor(file: File) {
        this.file = file;
    }
}
