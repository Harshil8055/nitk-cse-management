import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

export enum CourseCodes {
  BTECH = 'BTECH',
  MTECH_CSE = 'MTECH_CSE',
  MTECH_CSIS = 'MTECH_CSIS',
  MTECH_CSE_R = 'MTECH_CSE_R',
  MTECH_CSIS_R = 'MTECH_CSIS_R'
}

export class CourseListModel {
  id: string = null as any;
  name: string = null as any;
  code: string = null as any;
  duration: string = null as any;
  yearList: {
    courseId: string,
    year: number,
    title: string
  }[] = [];
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  coursesList: CourseListModel[] = [];

  selectedCourseId: string = null as any;

  selectedYear: number = null as any;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.get('courses').subscribe((response) => {
      if (response && response.length) {
        this.coursesList = response;
        this.coursesList.forEach((value: CourseListModel) => {
          this.addYearsListAccordingToCourse(value);
        });
        this.selectedCourseId = this.coursesList[0].id;
        this.selectedYear = this.coursesList[0].yearList[0].year;
      }
    })
  }

  addYearsListAccordingToCourse(courseValue: CourseListModel) {
    const courseCode: string = courseValue && courseValue.code && courseValue.code.toUpperCase();
    const currentYear = new Date().getFullYear();
    switch (courseCode) {
      case CourseCodes.BTECH:
        courseValue.yearList = [
          {
            courseId: courseValue.id,
            year: 1,
            title: 'First Year (Batch of ' + (currentYear - 1).toString() + ' - ' + (currentYear + 3).toString().substr(2, 2) + ')'
          },
          {
            courseId: courseValue.id,
            year: 2,
            title: 'Second Year (Batch of ' + (currentYear - 2).toString() + ' - ' + (currentYear + 2).toString().substr(2, 2) + ')'
          },
          {
            courseId: courseValue.id,
            year: 3,
            title: 'Third Year (Batch of ' + (currentYear - 3).toString() + ' - ' + (currentYear + 1).toString().substr(2, 2) + ')'
          },
          {
            courseId: courseValue.id,
            year: 4,
            title: 'Fourth Year (Batch of ' + (currentYear - 4).toString() + ' - ' + (currentYear + 0).toString().substr(2, 2) + ')'
          }
        ];
        break;
      case CourseCodes.MTECH_CSE:
        courseValue.yearList = [
          {
            courseId: courseValue.id,
            year: 1,
            title: 'First Year (Batch of ' + (currentYear).toString() + ' - ' + (currentYear + 1).toString().substr(2, 2) + ')'
          },
          {
            courseId: courseValue.id,
            year: 2,
            title: 'Second Year (Batch of ' + (currentYear - 1).toString() + ' - ' + (currentYear).toString().substr(2, 2) + ')'
          }
        ];
        break;
      case CourseCodes.MTECH_CSIS:
        courseValue.yearList = [
          {
            courseId: courseValue.id,
            year: 1,
            title: 'First Year (Batch of ' + (currentYear).toString() + ' - ' + (currentYear + 1).toString().substr(2, 2) + ')'
          },
          {
            courseId: courseValue.id,
            year: 2,
            title: 'Second Year (Batch of ' + (currentYear - 1).toString() + ' - ' + (currentYear).toString().substr(2, 2) + ')'
          }
        ];
        break;
      case CourseCodes.MTECH_CSE_R:
        courseValue.yearList = [
          {
            courseId: courseValue.id,
            year: 1,
            title: 'First Year (Batch of ' + (currentYear).toString() + ' - ' + (currentYear + 1).toString().substr(2, 2) + ')'
          }
        ];
        break;
      case CourseCodes.MTECH_CSIS_R:
        courseValue.yearList = [
          {
            courseId: courseValue.id,
            year: 1,
            title: 'First Year (Batch of ' + (currentYear).toString() + ' - ' + (currentYear + 1).toString().substr(2, 2) + ')'
          }
        ];
        break;
    }
  }

  yearTitleClickHandler(batchDetails: any) {
    this.selectedCourseId = batchDetails.courseId;
    this.selectedYear = batchDetails.year;
  }

  isBatchSelected(batchDetails: any) {
    return this.selectedCourseId === batchDetails.courseId && this.selectedYear === batchDetails.year;
  }

}
