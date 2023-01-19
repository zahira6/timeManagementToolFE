import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit{
  Project = '';
  Description = '';
  Date = new Date();
  Duration = 0;
  Id = '';
  entries = this.entryService.entries
  constructor(private entryService: EntryService) {
  }

  ngOnInit(): void {
    this.allEntries()
  }

  allEntries(): void{
    this.entryService.getEntries();
  }

  newEntry(): void {
    this.entryService.addEntry(this.Project, this.Description, this.Date, this.Duration, this.Id)
    this.allEntries()
  }

  deleteEntry(id: string): void {
    this.entryService.deleteEntry(id)
    this.entryService.getEntries()
  }

  updateEntry(): void {
    this.entryService.updateEntryById(this.Project, this.Description, this.Date, this.Duration, this.Id)
    this.allEntries()
  }

}
