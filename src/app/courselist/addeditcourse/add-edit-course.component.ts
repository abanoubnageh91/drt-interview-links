import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Course } from '../course.model';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-add-edit-course',
    templateUrl: './add-edit-course.component.html'
})

export class AddEditCourseComponent implements OnInit {
    @Input() selectedCourse: Course;
    @Input() isEditMode: boolean;
    @Output() saveCourseEmit = new EventEmitter<Course>();
    @ViewChild('closebutton') closebutton;
    addEditForm: FormGroup;
    submitted = false;
    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        let durationPattern = "^[0-9]*$";
        this.addEditForm = this.formBuilder.group({
            id: [{ value: '', disabled: true }],
            title: ['', [
                Validators.required,
                Validators.minLength(4),
            ]],
            duration: ['', [
                Validators.required,
                Validators.max(100),
                Validators.pattern(durationPattern)
            ]],
            durationUnit: ['', [
                Validators.required
            ]],
            description: ['', [
                Validators.required,
                Validators.maxLength(1000)
            ]]
        });
    }

    resetForm() {
        this.submitted = false;
        this.addEditForm.reset();
    }

    get f() { return this.addEditForm.controls; }


    saveCourse() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.addEditForm.invalid) {
            return;
        }
        this.saveCourseEmit.emit(this.selectedCourse);
        this.closebutton.nativeElement.click();
    }



}
