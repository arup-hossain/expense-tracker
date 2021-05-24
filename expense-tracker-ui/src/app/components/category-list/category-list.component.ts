import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryPopupComponent } from '../category-popup/category-popup.component';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    expenseCategories: Category[] = [];
    incomeCategories: Category[] = [];

    constructor(
        private dialog: MatDialog,
        private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.getCategories();
    }

    openPopup(mode: string, id?: string): void {
        this.dialog
            .open(CategoryPopupComponent, { data: { mode, id } })
            .afterClosed().subscribe(() => this.getCategories());
    }

    getCategories(): void {
        this.categoryService.getCategories('Expense').subscribe(
            res => this.expenseCategories = res);
        this.categoryService.getCategories('Income').subscribe(
            res => this.incomeCategories = res);
    }

}
