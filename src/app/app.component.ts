// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
// import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-table',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet, FormsModule],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   tableDataForm: FormGroup;
//   displayedColumns: string[] = ['name', 'age', 'email', 'available', 'action'];

//   constructor(private fb: FormBuilder) { }

//   ngOnInit() {
//     this.initForm();
//   }

//   initForm() {
//     this.tableDataForm = this.fb.group({
//       rows: this.fb.array([])
//     });

//     this.tableData.forEach(row => this.addRow(row));
//   }

//   addRow(rowData: any) {
//     const row = this.fb.group({
//       name: [rowData.name],
//       age: [rowData.age],
//       email: [rowData.email],
//       available: [rowData.available],
//       inputFields: this.fb.array([]),
//       showWROButtons: [rowData.showWROButtons],
//       isDisabled: [rowData.isDisabled]
//     });

//     const inputFields = row.get('inputFields') as FormArray;
//     rowData.inputFields.forEach((field: any) => {
//       inputFields.push(this.fb.group({
//         inputField1: [field.inputField1],
//         inputField2: [field.inputField2]
//       }));
//     });

//     this.rows.push(row);
//   }

//   get rows() {
//     return this.tableDataForm.get('rows') as FormArray;
//   }

//   addWRO(index: number) {
//     const row: any = this.rows.at(index);
//     row.get('isDisabled').setValue(false);
//     row.get('available').setValue('');
//     row.get('showWROButtons').setValue(false);
//     row.get('inputFields').push(this.fb.group({
//       inputField1: [''],
//       inputField2: ['']
//     }));
//     row.get('available').setValue('-');
//   }

//   addField(index: number) {
//     const row = this.rows.at(index);
//     const inputFields = row.get('inputFields') as FormArray;
//     if (inputFields.length < 10) {
//       inputFields.push(this.fb.group({
//         inputField1: [''],
//         inputField2: ['']
//       }));
//       row.get('available').setValue('-');
//     } else {
//       alert('Maximum 10 fields allowed.');
//     }
//   }

//   removeField(row: FormGroup, index: number) {
//     const inputFields = row.get('inputFields') as FormArray;
//     if (inputFields.length > 1) {
//       inputFields.removeAt(index);
//     } else {
//       row.get('showWROButtons').setValue(true);
//       row.get('available').setValue('');
//     }
//   }
// }