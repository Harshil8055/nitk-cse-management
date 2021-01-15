import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { ApiService } from 'src/app/api.service';

export class ContactInfoModel {
  name: string = 'Dr. Alwyn Roshan Pais';
  designation: string = 'Associate Professor and Head of Department';
  address: string = 'National Institute of Technology Karnataka Srinivasnagar, Surathkal, Mangalore – 575025, Karnataka, India';
  phone: string = '+91-824-2474053';
  officePhone: string = '+91-824-2473044';
  email: string = "csedeptnitk@gmail.com";

  convertToLocal(apiResponse: ContactInfoModel): ContactInfoModel {
    this.name = apiResponse.name ? apiResponse.name : this.name;
    this.designation = apiResponse.designation ? apiResponse.designation : this.designation;
    this.designation += ' of Computer Science and Engineering';
    this.address = apiResponse.address ? apiResponse.address : this.address;
    this.phone = apiResponse.phone ? apiResponse.phone : this.phone;
    this.officePhone = apiResponse.officePhone ? apiResponse.officePhone : this.officePhone;
    this.email = apiResponse.email ? apiResponse.email : this.email;
    return this;
  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup = null as any;

  contactInfo: ContactInfoModel = null as any;

  formValueChangeSubscription: Subscription = null as any;

  constructor(
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private apiService: ApiService
  ) {
    this.createContactForm();
  }

  setFormValueChangeSubscription() {
    this.formValueChangeSubscription = this.contactForm.valueChanges.subscribe(() => {
      const formControls = this.elementRef.nativeElement.querySelectorAll('[formControlName]');
      if (formControls && formControls.length) {
        formControls.forEach((control: any) => {
          if (control.classList.contains('invalid-control')) {
            control.classList.remove('invalid-control');
          }
        });
      }
    })
  }

  ngOnInit(): void {
    this.getContactInfo();
  }

  getContactInfo() {
    this.contactInfo = new ContactInfoModel().convertToLocal(new ContactInfoModel());
  }

  createContactForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
    this.setFormValueChangeSubscription();
  }

  submitClickHandler() {
    if (this.contactForm.valid) {
      this.apiService.post('mail', this.contactForm.value).subscribe((response) => {
        if (response && response.status) {
          alert("Check your Mail Inbox");
          this.contactForm.reset();
        } else {
          alert("Something went wrong while saving contact's data.");
        }
      });
    } else {
      this.focusFirstInvalidControl();
    }
  }

  focusFirstInvalidControl(): any {
    const invalidControls = this.elementRef.nativeElement.querySelectorAll('[formControlName].ng-invalid');
    if (invalidControls && invalidControls.length) {
      const firstInvalidControl = invalidControls[0];
      if (!firstInvalidControl.classList.contains('invalid-control')) {
        firstInvalidControl.classList.add('invalid-control');
      }
      firstInvalidControl.focus();
    }
  }

  navigateToTwitterPage() {
    window.open("https://twitter.com/cse_nitk");
  }

  navigateToFacebookPage() {
    window.open("https://www.facebook.com/nitk.cse/");
  }

  navigateToInstagramPage() {
    window.open("https://www.instagram.com/nitk.surathkal/?hl=en");
  }

  ngOnDestroy() {
    this.formValueChangeSubscription.unsubscribe();
  }

}
