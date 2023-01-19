import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Entry } from '../model/entry';

const AUTH_API = 'http/localhost:8080/entry';
@Injectable({
  providedIn: 'root'
})
export class EntryService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  entries: Entry[] = []

  constructor(private http: HttpClient, private router: Router) { }

  getEntries(){
    return this.http.get<[Entry]>(`${AUTH_API}`).subscribe(i => {
      i.forEach( entry => {
        const project = entry.project;
        const description = entry.description;
        const date = entry.date;
        const duration = entry.duration;
        const id = entry.id
        if (this.entries.filter( t => t.id === id).length === 0) {
          this.entries.push({project, description, date, duration, id})
        }
      })
    })
  };

  addDiary(project: string, description: string, date: Date, duration: number, id: string){
    let newDate = new Date(date).getTime()
    return this.http.post<Entry>(`${AUTH_API}`,
      {'project': project, 'description': description, 'date': newDate, 'duration': duration, 'id': id}
    ).subscribe(i => {
        project = i.project,
        description = i.description,
        date = new Date(i.date),
        duration = i.duration,
        id = i.id,
          date.toDateString()
      this.entries.unshift({project, description, date, duration, id})
    })
  }

  deleteDiary(id: string){
    const options = {
      body: {
        id: id
      },
    };
    return this.http.delete<string>(`${AUTH_API}`, options).subscribe(i => {
      const index = this.entries.findIndex(t => t.id === id);
      if (index >= 0) {
        this.entries.splice(index, 1);
      }
    })
  };

  updateEntryById(project: string, description: string, date: Date, duration: number, id: string){
    let newDate = new Date(date).getTime()
    return this.http.put<Entry>(`${AUTH_API}`, 
      {'project': project, 'description': description, 'date': newDate, 'duration': duration, 'id': id}
    ).subscribe(i => {
      project = i.project,
        description = i.description,
        date = new Date(i.date),
        duration = i.duration,
        id = i.id,
        date.toDateString()
      this.entries.unshift({project, description, date, duration, id})
    })
  }
}
