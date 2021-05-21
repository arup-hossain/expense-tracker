export interface Transaction {
    _id: string;
    amount: number;
    date: Date;
    note?: string;
}
