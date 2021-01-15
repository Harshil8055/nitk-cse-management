import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { CourseCodes, CourseListModel } from '../people/students/students.component';

export class StudentMarkDetails {
  id: number = null as any;
  rollNo: string = null as any;
  name: string = null as any;
  marks: number = null as any;
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

  studentList: any[] = [];

  constructor(
    private apiService: ApiService
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

  filterClickHandler() {
    if (this.selectedCourse && this.selectedCourse.id && this.selectedYear) {
      this.apiService.get('students', { courseId: this.selectedCourse.id, year: this.selectedYear }).subscribe((response) => {
        this.studentList = response;
        this.studentList.forEach((value: StudentMarkDetails) => {
          value.marks = 0;
        })
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

  markClickHandler(student: any) {
    if (!student.isEditMode) {
      student.isEditMode = true;
    }
  }

}
