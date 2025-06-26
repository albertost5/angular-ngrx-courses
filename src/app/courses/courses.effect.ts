import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CoursesHttpService} from "./services/courses-http.service";
import {CoursesActions} from "./action-type";
import {map, switchMap} from "rxjs/operators";
import {allCoursesLoaded} from "./courses.actions";


@Injectable()
export class CoursesEffect {

  actions$ = inject(Actions);
  coursesService = inject(CoursesHttpService);

  loadAllCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.loadAllCourses),
      switchMap(action => this.coursesService.findAllCourses()),
      map(courses => allCoursesLoaded({courses})),
    )
  });
}
