export class Course {
    id: number;
    title: string;
    duration: number;
    durationUnit: string;
    description: string;
    constructor() {
        this.id = 0;
        this.title = "";
        this.duration = 0;
        this.durationUnit = "";
        this.description = "";
    }
}