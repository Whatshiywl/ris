import { TestBed, inject, async } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

// describe('AppComponent', () => {
//   beforeEach(async() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AppComponent,
//         HomeComponent
//       ],
//       imports: [
//         RouterModule.forRoot([
//           {path:"home", component: HomeComponent},
//           {path:"", redirectTo: "home", pathMatch: "full"},
//           {path:"**", redirectTo: "home", pathMatch: "full"}
//         ]),
//       ],
//     }).compileComponents();
//   });

//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));

//   it(`should have as title 'app'`, async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('app');
//   }));

//   it('should render title in a h1 tag', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!!');
//   }));
// });
