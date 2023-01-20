
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent {
  isSaved: boolean = false;
  isRunning: boolean = false;
  time: any;
  timerDisplay: any;
  seconds: any = '00';
  minutes: any = '00';
  hours: any = '00';
  counter: number = 0;
  timeRef: any;
  Project = '';
  Description = '';
  Date = new Date();
  Id = '';
  Duration = '';
  entries = this.entryService.entries

  constructor(private entryService: EntryService, private router: Router){}

  startTimer(){
    this.isRunning = !this.isRunning;
    if(this.isRunning) {
      const startTime = Date.now() - (this.counter || 0);
      this.timeRef = setInterval(() => {
        this.counter = Math.abs(Date.now() - startTime);
        this.hours = Math.floor(this.counter / 3600000);
        this.minutes = Math.floor(this.counter / 60000);
        this.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
        if (this.hours < 10) {
          this.hours = ('0' + this.hours).slice(-2);
        }
        if (this.minutes < 10) {
          this.minutes = ('0' + this.minutes).slice(-2);
        }
        if (this.seconds < 10) {
          this.seconds = ('0' + this.seconds).slice(-2);
        }
      })
    } else {
      clearInterval(this.timeRef);
    }
  }

  saveTimer(){
    this.isSaved = !this.isSaved;
    this.Duration = (this.hours + ':' + this.minutes + ':' + this.seconds)
  }

  newEntryWithTimeTracker(): void {
    this.entryService.addEntry(this.Project, this.Description, this.Date, this.Duration, this.Id)
    alert("Entry successfully saved");
    this.router.navigate(['profile/entry'])
  }
  
}
