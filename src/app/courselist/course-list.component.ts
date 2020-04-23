import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CourseListService } from './course-list.service';
import { Course } from './course.model';
import { AddEditCourseComponent } from './addeditcourse/add-edit-course.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})

export class CourseListComponent implements OnInit {

  courses: Course[];
  isEditMode: boolean = false;
  selectedCourse: Course;
  @ViewChild(AddEditCourseComponent)
  addEditCourse: AddEditCourseComponent;
  constructor(private courseListService: CourseListService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.courseListService.getCourses()
      .subscribe(courses => this.courses = courses);
  }

  search(term: string): void {
    if (term.trim()) {
      this.courses = this.courses.filter(c => {
        return c.title.toLocaleLowerCase().includes(term.toLocaleLowerCase());
      })
    } else {
      this.getCourses();
    }
  }

  delete(course: Course): void {
    this.courses = this.courses.filter(c => c !== course);
    this.courseListService.deleteCourse(course).subscribe();
  }

  addCourse() {
    this.addEditCourse.resetForm();
    this.isEditMode = false;
    this.selectedCourse = {
      id: Math.max.apply(Math, this.courses.map(c => { return c.id; })) + 1,
      title: "",
      duration: 0,
      durationUnit: "",
      description: ""
    };

  }

  editCourse(id: number) {
    this.addEditCourse.resetForm();
    this.isEditMode = true;
    this.courseListService.getCourse(id)
      .subscribe(course => this.selectedCourse = course);
  }

  saveCourse(course: Course) {
    if (this.isEditMode) {
      let updatedCourse = this.courses.filter(c => c.id == course.id);

      if (updatedCourse.length == 1) {
        updatedCourse[0].title = course.title;
        updatedCourse[0].duration = course.duration;
        updatedCourse[0].durationUnit = course.durationUnit;
        updatedCourse[0].description = course.description;

      }
    } else {
      this.courseListService.addCourse(course)
        .subscribe(c => {
          this.getCourses();

        });
    }
  }

}
