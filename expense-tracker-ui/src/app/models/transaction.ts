import { Category } from "./category";

export interface Transaction {
    _id: string;
    category: Category;
    amount: number;
    date: Date;
    note?: string;
}
