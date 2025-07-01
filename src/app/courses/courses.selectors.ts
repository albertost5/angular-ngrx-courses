import {createFeatureSelector, createSelector} from "@ngrx/store";
import {coursesFeatureKey, CoursesState} from "./reducers/courses.reducers";
import * as fromCourses from './reducers/courses.reducers';

export const selectCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
);

export const selectBeginnersCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(c => c.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(c => c.category === 'ADVANCED')
);

export const selectPromotionTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(c => c.promo ).length
);

export const isAllCoursesLoaded = createSelector(
  selectCoursesState,
  state => state.allCoursesLoaded
);
