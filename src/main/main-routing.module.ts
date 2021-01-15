import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AchivementsComponent } from 'src/components/achivements/achivements.component';
import { ContactComponent } from 'src/components/contact/contact.component';
import { CoursesComponent } from 'src/components/courses/courses.component';
import { EventsComponent } from 'src/components/events/events.component';
import { FacilitiesComponent } from 'src/components/facilities/facilities.component';
import { HomeComponent } from 'src/components/home/home.component';
import { MarksComponent } from 'src/components/marks/marks.component';
import { PeopleDetailComponent } from 'src/components/people/people-detail/people-detail.component';
import { PeopleComponent } from 'src/components/people/people.component';
import { StudentsComponent } from 'src/components/people/students/students.component';
import { PlacementsComponent } from 'src/components/placements/placements.component';
import { ProgrammesComponent } from 'src/components/programmes/programmes.component';
import { ResearchComponent } from 'src/components/research/research.component';
import { SecurityRightsComponent } from 'src/components/security-rights/security-rights.component';
import { MainComponent } from 'src/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'programmes',
        component: ProgrammesComponent
      },
      {
        path: 'courses',
        component: CoursesComponent
      },
      {
        path: 'people',
        component: PeopleComponent
      },
      {
        path: 'facilities',
        component: FacilitiesComponent
      },
      {
        path: 'research',
        component: ResearchComponent
      },
      {
        path: 'achivements',
        component: AchivementsComponent
      },
      {
        path: 'placements',
        component: PlacementsComponent
      },
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'people-detail/edit/:id',
        component: PeopleDetailComponent
      },
      {
        path: 'people-detail/create',
        component: PeopleDetailComponent
      },
      {
        path: 'students',
        component: StudentsComponent
      },
      {
        path: 'security-rights',
        component: SecurityRightsComponent
      },
      {
        path: 'marks',
        component: MarksComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
