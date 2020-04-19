import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CourseListService } from './courselist.service';
import { Course } from './course';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})

export class CourseListComponent implements OnInit {

  courses: Course[];
  isEditMode: boolean = false;
  selectedCourse: Course;
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
    this.selectedCourse = new Course();
    this.selectedCourse.id = Math.max.apply(Math, this.courses.map(c => { return c.id; })) + 1;
  }

  editCourse(id: number) {
    this.isEditMode = true;
    this.courseListService.getCourse(id)
      .subscribe(course => this.selectedCourse = course);
  }

  saveCourse() {
    if (this.isEditMode) {
      let course = this.courses.filter(c => c.id == this.selectedCourse.id);

      if (course.length == 1) {
        course[0].title = this.selectedCourse.title;
        course[0].duration = this.selectedCourse.duration;
        course[0].durationUnit = this.selectedCourse.durationUnit;
        course[0].description = this.selectedCourse.description;

      }
    } else {
      this.courseListService.addCourse(this.selectedCourse)
        .subscribe(course => {
          this.getCourses();

        });
    }
  }

}
