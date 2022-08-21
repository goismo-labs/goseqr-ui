import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'projects-cmp',
  moduleId: module.id,
  templateUrl: 'projects.component.html'
})

export class ProjectsComponent implements OnInit{
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  public tableData1: TableData;
  public tableData2: TableData;
  ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.tableData1 = {
      headerRow: [ 'ID', 'Name', 'Country', 'City', 'Salary'],
      dataRows: [
        ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
        ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
        ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
        ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
        ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
        ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
      ]
    };
    this.tableData2 = {
      headerRow: [ 'ID', 'Name',  'Salary', 'Country', 'City' ],
      dataRows: [
        ['1', 'Dakota Rice','$36,738', 'Niger', 'Oud-Turnhout' ],
        ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
        ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
        ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
        ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
        ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
      ]
    };
  }
}
