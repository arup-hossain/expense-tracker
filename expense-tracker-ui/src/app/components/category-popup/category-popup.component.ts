import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-category-popup',
    templateUrl: './category-popup.component.html',
    styleUrls: ['./category-popup.component.css']
})
export class CategoryPopupComponent implements OnInit {

    categoryForm: FormGroup = this.formBuilder.group({
        name: [null, Validators.required],
        type: [null, Validators.required]
    });

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private notifier: NotifierService,
        private dialogRef: MatDialogRef<CategoryPopupComponent>) { }

    ngOnInit(): void {
        this.getCategory();
    }

    saveCategory(): void {
        if (this.categoryForm.invalid) return;
        const category: Category = { ...this.categoryForm.value };
        if (this.data.mode === 'create') {
            this.categoryService.createCategory(category).subscribe(() => {
                this.notifier.notify('success', 'Category created successfully');
                this.close();
            });
        } else {
            this.categoryService.updateCategory(this.data.id, category).subscribe(() => {
                this.notifier.notify('success', 'Category updated successfully');
                this.close();
            });
        }
    }

    getCategory(): void {
        if (this.data.mode !== 'update') return;
        this.categoryService.getCategory(this.data.id).subscribe(
            res => this.categoryForm.patchValue(res));
    }

    deleteCategory(): void {
        this.categoryService.deleteCategory(this.data.id).subscribe(() => {
            this.notifier.notify('success', 'Category deleted successfully');
            this.close();
        });
    }

    close(): void {
        this.dialogRef.close();
    }

}
