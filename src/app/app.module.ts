import {BrowserModule} from '@angular/platform-browser';
import {isDevMode, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';
import {AuthModule} from './auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {metaReducers, reducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AuthGuard} from "./auth/auth.guard";
import {EffectsModule} from "@ngrx/effects";
import {RouterState, StoreRouterConnectingModule} from "@ngrx/router-store";


const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/'
  }
];



@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatToolbarModule,
        AuthModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        EffectsModule.forRoot([]),
        // Router logs
        StoreRouterConnectingModule.forRoot({
          stateKey: 'router',
          routerState: RouterState.Minimal,
        })
        ], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
}
