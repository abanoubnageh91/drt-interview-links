import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { Course } from './course.model';


@Injectable({ providedIn: 'root' })
export class CourseListService {

  private coursesUrl = 'http://localhost:4243/courses';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.coursesUrl}`)
      .pipe(
        tap(_ => this.log('fetched Courses')),
        catchError(this.handleError<Course[]>('getCourses', []))
      );
  }

  getCourse(id: number): Observable<Course> {
    const url = `${this.coursesUrl}/${id}`;
    return this.http.get<Course>(url).pipe(
      tap(_ => this.log(`fetched course id=${id}`)),
      catchError(this.handleError<Course>(`getCourse id=${id}`))
    );
  }
  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.coursesUrl, course, this.httpOptions).pipe(
      tap((newCourse: Course) => this.log(`added course w/ id=${newCourse.id}`)),
      catchError(this.handleError<Course>('addCourse'))
    );
  }

  deleteCourse(course: Course | number): Observable<Course> {
    const id = typeof course === 'number' ? course : course.id;
    const url = `${this.coursesUrl}/${id}`;

    return this.http.delete<Course>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted course id=${id}`)),
      catchError(this.handleError<Course>('deleteCourse'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`CourseListService: ${message}`);
  }
}