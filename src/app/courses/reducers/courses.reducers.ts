import {createReducer, on} from '@ngrx/store';
import {Course} from "../model/course";
import {CoursesActions} from "../action-type";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

export const coursesFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course>{
  allCoursesLoaded: boolean;
}

export function sortBySeqNo(a: Course, b: Course): number {
  // 1; -1; 0 => sort
  /**
   * if (a.seqNo > b.seqNo) return 1
   * if (a.seqNo < b.seqNo) return -1
   * return 0
   * */
  return a.seqNo - b.seqNo;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>({
  sortComparer: sortBySeqNo,
});

export const initialCoursesState: EntityState<Course> = adapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CoursesActions.allCoursesLoaded, (state, action) =>
    adapter.addMany(action.courses, {...state, allCoursesLoaded: true}),
  ),
  on(CoursesActions.courseUpdated, (state, action) =>
    adapter.updateOne(action.update, state)
  )
)


export const {selectAll} = adapter.getSelectors();
