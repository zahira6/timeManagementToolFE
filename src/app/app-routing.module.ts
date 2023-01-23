import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './profile/entry/entry.component';
import { TimeTrackerComponent } from './profile/time-tracker/time-tracker.component';
import { UpdateEntryComponent } from './profile/update-entry/update-entry.component';
import { GuardService } from './user/guard.service';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {path: 'user/login', component: LoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: 'user/logout', component: LogoutComponent, canActivate: [GuardService]},
  {path: 'profile/entry', component: EntryComponent, canActivate: [GuardService]},
  {path: 'profile/timeTracker', component: TimeTrackerComponent, canActivate: [GuardService]},
  {path: 'profile/entry/:id', component: UpdateEntryComponent, canActivate: [GuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
