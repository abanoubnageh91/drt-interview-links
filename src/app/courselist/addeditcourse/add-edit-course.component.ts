import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Course } from '../course.model';

@Component({
    selector: 'app-add-edit-course',
    templateUrl: './add-edit-course.component.html'
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
