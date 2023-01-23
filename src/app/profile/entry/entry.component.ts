import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit{
  addNewEntry: boolean = false;
  Project = '';
  Description = '';
  Date = new Date();
  Duration = '';
  Id = '';
  entries = this.entryService.entries
  constructor(private entryService: EntryService, private router: Router) {
  }

  showNewEntry(): void {
    this.addNewEntry = !this.addNewEntry
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

  navigateToUpdateEntry(id: string): void {
    this.router.navigate(['profile/entry', id])
  }
}
