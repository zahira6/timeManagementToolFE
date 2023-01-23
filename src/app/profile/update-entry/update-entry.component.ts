import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.scss']
})
export class UpdateEntryComponent implements OnInit{
  entries = this.entryService.entries;
  Project = '';
  Description = '';
  Date = new Date();
  Duration = '';
  Id = '';

  constructor(private router: Router, private entryService: EntryService, private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id') || '{}';
  }

  updateEntry(): void {
    this.entryService.updateEntryById(this.Project, this.Description, this.Date, this.Duration, this.Id);
    this.router.navigate(['profile/entry']);
  }
}
