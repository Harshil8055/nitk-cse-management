import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthService, PermissionsList } from 'src/app/auth.service';

export class StudentDetailModel {
  id: number = null as any;
  rollNo: string = null as any;
  name: string = null as any;
  course: string = null as any;
  userId: number = null as any;
  year: string = null as any;
  serialNo: number = null as any;
  isEditMode: boolean = false;
}

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit, OnChanges {

  @Input()
  courseId: string = null as any;

  @Input()
  year: number = null as any;

  studentList: StudentDetailModel[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.courseId && this.year) {
      this.apiService.get('students', { courseId: this.courseId, year: this.year }).subscribe((response) => {
        this.studentList = response;
        this.studentList.forEach((value: StudentDetailModel, index: number) => {
          value.serialNo = index + 1;
        });
      });
    }
  }

  printClickHandler(event: any) {
    const iframe: any = window.frames['print_frame' as any];
    const tableInnerHtml: any = document.getElementById('studentTable')?.innerHTML;
    iframe.document.body.innerHTML = tableInnerHtml;
    iframe.window.focus();
    iframe.window.print();
  }

  editClickHandler(student: StudentDetailModel) {
    student.isEditMode = true;
  }

  saveClickHandler(student: StudentDetailModel) {
    this.apiService.post('students', { id: student.id, name: student.name }).subscribe((response) => {
      if (response && response.status) {
        student.isEditMode = false;
      } else {
        alert("Something went wrong while saving student's data.");
      }
    });
  }

  isStudentEditPermissionAvailable(student: StudentDetailModel): boolean {
    const isEditPermissionAvailable: boolean = this.authService.isPermissionAvailable(PermissionsList.STUDENTSUPDATE);
    if (isEditPermissionAvailable) {
      return !student.isEditMode
    } else {
      const isParticalEditPermissionAvailable: boolean = this.authService.isPermissionAvailable(PermissionsList.STUDENTSPARTIALUPDATE);
      const userId: number = this.authService.getLoggedInUserId();
      return isParticalEditPermissionAvailable && userId === student.userId && !student.isEditMode;
    }
  }

}
