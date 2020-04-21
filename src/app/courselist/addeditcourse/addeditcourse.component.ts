import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Course } from '../course';

@Component({
    selector: 'add-edit-course',
    templateUrl: './addeditcourse.component.html'
})

export class AddEditCourseComponent implements OnInit {
    @Input() selectedCourse: Course;
    @Input() isEditMode: boolean;
    @Output() saveCourseEmit = new EventEmitter<Course>();

    constructor() { }

    ngOnInit(): void {
    }


    saveCourse() {
        this.saveCourseEmit.emit(this.selectedCourse);
    }


}
