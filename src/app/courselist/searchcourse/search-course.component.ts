import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search-course',
    templateUrl: './search-course.component.html'
})

export class SearchCourseComponent implements OnInit {

    @Output() searchText = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {
    }


    search(term: string): void {
        this.searchText.emit(term);
    }


}
