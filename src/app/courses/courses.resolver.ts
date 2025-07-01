import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {filter, finalize, first, tap} from "rxjs/operators";
import {loadAllCourses} from "./courses.actions";
import {isAllCoursesLoaded} from "./courses.selectors";

@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<AppState>) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      select(isAllCoursesLoaded),
      tap((isAllCoursesLoaded) => {
        if (!this.loading && !isAllCoursesLoaded) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      filter(isAllCoursesLoaded => isAllCoursesLoaded),
      first(),
      finalize(() => this.loading = false),
    );
  }
}
