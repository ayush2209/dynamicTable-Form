import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Warehouse {
  quantity: number;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  selectedBrand: string = '';
  searchQuery: string = '';
  brands: string[] = ['Obagi D2C', 'Brand2', 'Brand3'];
  itemsForm!: FormGroup;

  items: any[] = [
    { inventoryId: 'SB5307', sku: '5307', name: 'ALPHARET OVERNIGHT CREAM 30 ML', qtySending: [], lotExpirationFields: [] },
    { inventoryId: 'SB5327', sku: '5327', name: 'INTENSIVE ALPHARET OVERNIGHT CREAM 50 ML', qtySending: [], lotExpirationFields: [] },
    { inventoryId: 'SB5128', sku: '5128', name: 'EYEMAX ALPHARET OVERNIGHT CREAM 15 ML', qtySending: [], lotExpirationFields: [] },
    { inventoryId: 'SB5404', sku: '5404', name: 'SUNBETTER TONE SMART SPF 75 SUNSCREEN LOTION 50 ML', qtySending: [], lotExpirationFields: [] },
    { inventoryId: 'SB5113', sku: '5113', name: 'SOLO HYDRATING DEFENSE 50ML', qtySending: [], lotExpirationFields: [] },
    { inventoryId: 'SB5190', sku: '5100', name: 'HYDRATION BOOSTING CREAM 50 ML', qtySending: [], lotExpirationFields: [] }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {

  }

  ngOnInit() {
    this.itemsForm = this.fb.group({
      items: this.fb.array(this.items.map(item => this.createItem(item)))
    });

    const url = '../assets/sample.json';
    this.http.get(url).subscribe((res: any) => {
      console.log(res);
      this.resetForm();
      this.patchData(res);
    })
  }

  get itemsArray() {
    return this.itemsForm.get('items') as FormArray;
  }

  createItem(item: any): FormGroup {
    return this.fb.group({
      inventoryId: [item.inventoryId],
      sku: [item.sku],
      name: [item.name],
      qtySending: this.fb.array(item.qtySending.map((qty: any) => this.createQtyField(qty))),
      lotExpirationFields: this.fb.array(item.lotExpirationFields.map((lot: any) => this.createLotExpirationField(lot)))
    });
  }

  createQtyField(qty = { qty: '' }): FormGroup {
    return this.fb.group({
      qty: [qty.qty]
    });
  }

  createLotExpirationField(lot = { lotNumber: '', expirationDate: '' }): FormGroup {
    return this.fb.group({
      lotNumber: [lot.lotNumber],
      expirationDate: [lot.expirationDate],
    });
  }

  addLot(itemIndex: number) {
    const lotExpirationFields = this.getLotExpirationFields(itemIndex);
    const qtySendingFields = this.getQtySendingFields(itemIndex);
    if (lotExpirationFields.length < 9) {
      lotExpirationFields.push(this.createLotExpirationField());
      qtySendingFields.push(this.createQtyField());
    } else {
      alert('Maximum 10 rows can be created.');
    }
  }

  removeLot(itemIndex: number, lotIndex: number) {
    this.getLotExpirationFields(itemIndex).removeAt(lotIndex);
    this.getQtySendingFields(itemIndex).removeAt(lotIndex);
  }

  getLotExpirationFields(itemIndex: number) {
    return this.itemsArray.at(itemIndex).get('lotExpirationFields') as FormArray;
  }

  getQtySendingFields(itemIndex: number) {
    return this.itemsArray.at(itemIndex).get('qtySending') as FormArray;
  }

  removeItem(itemIndex: number) {
    this.itemsArray.removeAt(itemIndex);
  }

  save() {
    const tableData: { inventoryId: any; sku: any; name: any; qtyAndLots: never[]; }[] = [];
    this.itemsArray.controls.forEach((itemControl: any) => {
      const itemData: any = {
        inventoryId: itemControl.get('inventoryId').value,
        sku: itemControl.get('sku').value,
        name: itemControl.get('name').value,
        qtyAndLots: []
      };

      // Iterate over qtySending and lotExpirationFields of each item
      for (let i = 0; i < itemControl.get('qtySending').length; i++) {
        const qtySending = itemControl.get('qtySending').at(i).get('qty').value;
        const lotNumber = itemControl.get('lotExpirationFields').at(i).get('lotNumber').value;
        const expirationDate = itemControl.get('lotExpirationFields').at(i).get('expirationDate').value;

        itemData.qtyAndLots.push({ qtySending, lotNumber, expirationDate });
      }

      // Push itemData to tableData array
      tableData.push(itemData);
    });

    // Output the constructed array
    console.log(tableData);
  }

  cancel() {
    // Implement the logic to cancel
  }

  patchData(data: any): void {
    const itemsArray = this.itemsForm.get('items') as FormArray;
    data.forEach((item: any) => {
      itemsArray.push(this.fb.group({
        inventoryId: [item.inventoryId],
        sku: [item.sku],
        name: [item.name],
        qtySending: this.fb.array(item.qtySending.map((qty: any) => this.createQtyField(qty))),
        lotExpirationFields: this.fb.array(item.lotExpirationFields.map((lot: any) => this.createLotExpirationField(lot)))
      }));
    });
  }

  resetForm(): void {
    const itemsArray = this.itemsForm.get('items') as FormArray;
    while (itemsArray.length !== 0) {
      itemsArray.removeAt(0);
    }
  }

  selectedOption1: string = '';
  selectedOption2: string = '';

  showDropdown2: boolean = false;
  showTable: boolean = false;
  showNextSection: boolean = false;

  dropdownOptions1: string[] = ["Option 1", "Option 2"];
  dropdownOptions2: string[] = ["Option 3", "Option 4"];

  onSelectOption1(option: any) {
    this.selectedOption1 = option.target.value;
    this.showDropdown2 = true;
  }

  onSelectOption2(option: any) {
    this.selectedOption2 = option.target.value;
    this.showTable = true;
  }

  onSaveAndContinue() {
    this.showNextSection = true;
  }
}
