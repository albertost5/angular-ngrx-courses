import {createReducer, on} from '@ngrx/store';
import {Course} from "../model/course";
import {CoursesActions} from "../action-type";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

export const coursesFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course>{

}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CoursesActions.allCoursesLoaded, (state, action) =>
    adapter.addMany(action.courses, state)
  )
)

export const {selectAll} = adapter.getSelectors();
