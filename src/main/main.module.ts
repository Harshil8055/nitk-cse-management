import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AchivementsComponent } from 'src/components/achivements/achivements.component';
import { ContactComponent } from 'src/components/contact/contact.component';
import { CoursesComponent } from 'src/components/courses/courses.component';
import { EventsComponent } from 'src/components/events/events.component';
import { FacilitiesComponent } from 'src/components/facilities/facilities.component';
import { HomeComponent } from 'src/components/home/home.component';
import { MainHeaderModule } from 'src/components/main-header/main-header.module';
import { PeopleComponent } from 'src/components/people/people.component';
import { PlacementsComponent } from 'src/components/placements/placements.component';
import { ProgrammesComponent } from 'src/components/programmes/programmes.component';
import { ResearchComponent } from 'src/components/research/research.component';
import { TabSelectionModule } from 'src/components/tab-selection/tab-selection.module';
import { ApiService } from '../app/api.service';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HttpClientModule } from '@angular/common/http';
import { PeopleListComponent } from 'src/components/people/people-list/people-list.component';
import { PeopleInfoCardComponent } from 'src/components/people/people-list/people-info-card/people-info-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeopleDetailComponent } from 'src/components/people/people-detail/people-detail.component';
import { EventListComponent } from 'src/components/events/event-list/event-list.component';
import { StudentsComponent } from 'src/components/people/students/students.component';
import { StudentDetailsComponent } from 'src/components/people/students/student-details/student-details.component';
import { SecurityRightsComponent } from 'src/components/security-rights/security-rights.component';
import { SecurityRightsListComponent } from 'src/components/security-rights/security-rights-list/security-rights-list.component';
import { MarksComponent } from 'src/components/marks/marks.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ProgrammesComponent,
    CoursesComponent,
    PeopleComponent,
    FacilitiesComponent,
    ResearchComponent,
    AchivementsComponent,
    PlacementsComponent,
    EventsComponent,
    EventListComponent,
    ContactComponent,
    PeopleListComponent,
    PeopleInfoCardComponent,
    PeopleDetailComponent,
    StudentsComponent,
    StudentDetailsComponent,
    SecurityRightsComponent,
    SecurityRightsListComponent,
    MarksComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MainHeaderModule,
    TabSelectionModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MainComponent,
    HomeComponent,
    ProgrammesComponent,
    CoursesComponent,
    PeopleComponent,
    FacilitiesComponent,
    ResearchComponent,
    AchivementsComponent,
    PlacementsComponent,
    EventsComponent,
    EventListComponent,
    ContactComponent,
    PeopleListComponent,
    PeopleInfoCardComponent,
    PeopleDetailComponent,
    StudentsComponent,
    StudentDetailsComponent,
    SecurityRightsComponent,
    SecurityRightsListComponent,
    MarksComponent
  ]
})
export class MainModule { }
