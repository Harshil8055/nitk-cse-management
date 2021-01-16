import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthService, PermissionsList } from 'src/app/auth.service';
import { CourseCodes, CourseListModel } from '../people/students/students.component';

export class StudentMarkDetails {
  id: number = null as any;
  rollNo: string = null as any;
  name: string = null as any;
  marks: number = null as any;
  marksId: number = null as any;
  userId: number = null as any;
  isEditMode: boolean = false;
}

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarksComponent implements OnInit {

  courseList: CourseListModel[] = [];

  selectedCourse: CourseListModel = null as any;

  selectedYear: number = null as any;

  studentList: StudentMarkDetails[] = [];

  subjectList: any[] = [];

  selectedSubject: any = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.apiService.get('courses').subscribe((response) => {
      if (response && response.length) {
        this.courseList = response;
        this.courseList.forEach((courseValue: CourseListModel) => {
          this.addYearsAccordingToCourse(courseValue);
        });
      }
    });
  }

  addYearsAccordingToCourse(courseValue: CourseListModel) {
    const courseCode: string = courseValue && courseValue.code && courseValue.code.toUpperCase();
    switch (courseCode) {
      case CourseCodes.BTECH:
        courseValue.yearList = [
          {
            courseId: courseValue.id,
            year: 1,
            title: 'First'
          },
          {
            courseId: courseValue.id,
            year: 2,
            title: 'Second'
          },
          {
            courseId: courseValue.id,
            year: 3,
            title: 'Third'
          },
          {
            courseId: courseValue.id,
            year: 4,
            title: 'Fourth'
          }
        ];
        break;
      case CourseCodes.MTECH_CSE:
        courseValue.yearList = [
          {
            courseId: courseValue.id,
            year: 1,
            title: 'First'
          },
          {
            courseId: courseValue.id,
            year: 2,
            title: 'Second'
          }
        ];
        break;
      case CourseCodes.MTECH_CSIS:
        courseValue.yearList = [
          {
            courseId: courseValue.id,
            year: 1,
            title: 'First'
          },
          {
            courseId: courseValue.id,
            year: 2,
            title: 'Second'
          }
        ];
        break;
      case CourseCodes.MTECH_CSE_R:
        courseValue.yearList = [
          {
            courseId: courseValue.id,
            year: 1,
            title: 'First'
          }
        ];
        break;
      case CourseCodes.MTECH_CSIS_R:
        courseValue.yearList = [
          {
            courseId: courseValue.id,
            year: 1,
            title: 'First'
          }
        ];
        break;
    }
  }

  courseChangeHandler(event: any) {
    const selectedItem: string = event && event.target && event.target.value;
    this.selectedCourse = this.courseList.find((courseValue: CourseListModel) => {
      return courseValue && selectedItem && courseValue.id === selectedItem;
    }) as any;
    this.selectedYear = null as any;
  }

  subjectChangeHandler(event: any) {
    const selectedItem: string = event && event.target && event.target.value;
    this.selectedSubject = this.subjectList.find((subjectValue: any) => {
      return subjectValue && selectedItem && subjectValue.id === selectedItem;
    });
  }

  yearChangeHandler() {
    if (this.selectedCourse && this.selectedYear) {
      this.apiService.get('subjects', {courseId: this.selectedCourse.id, year: this.selectedYear }).subscribe((response) => {
        if (response && response.length) {
          this.subjectList = response;
        }
      });
    }
  }

  filterClickHandler() {
    if (this.selectedCourse && this.selectedCourse.id && this.selectedYear && this.selectedSubject && this.selectedSubject.id) {
      this.apiService.get('marks', { courseId: this.selectedCourse.id, year: this.selectedYear, subjectId: this.selectedSubject.id }).subscribe((response) => {
        this.studentList = response;
      });
    }
  }

  printClickHandler() {
    const iframe: any = window.frames['print_frame' as any];
    const tableInnerHtml: any = document.getElementById('studentTable')?.innerHTML;
    iframe.document.body.innerHTML = tableInnerHtml;
    iframe.window.focus();
    iframe.window.print();
  }

  markClickHandler(student: StudentMarkDetails) {
    if (student && this.isMarksEditPermissionAvailable() && !student.isEditMode) {
      student.isEditMode = true;
    }
  }

  isMarksEditPermissionAvailable(): boolean {
    const isEditPermissionAvailable: boolean = this.authService.isPermissionAvailable(PermissionsList.MARKSUPDATE);
    if (isEditPermissionAvailable) {
      return true
    } else {
      const isParticalEditPermissionAvailable: boolean = this.authService.isPermissionAvailable(PermissionsList.MARKSPARTIALUPDATE);
      const userId: number = this.authService.getLoggedInUserId();
      return isParticalEditPermissionAvailable && this.selectedSubject && userId === this.selectedSubject.userId;
    }
  }

  saveClickHandler() {
    this.apiService.post('marks', { subjectId: this.selectedSubject.id, marks: this.studentList }).subscribe((response) => {
      if (response && response.status) {
        this.filterClickHandler();
      } else {
        alert("Something went wrong while saving mark's data.");
      }
    })
  }

}
