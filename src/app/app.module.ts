import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AlertModule } from './_alert';

import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseListComponent } from './courselist/courselist.component';
import { FormsModule } from '@angular/forms';
import { SearchCourseComponent } from './courselist/searchcourse/searchcourse.component';
import { AddEditCourseComponent } from './courselist/addeditcourse/addeditcourse.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    AboutComponent,
    CourseListComponent,
    SearchCourseComponent,
    AddEditCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AlertModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
