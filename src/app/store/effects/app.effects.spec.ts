import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StudentsEffects } from './students.effect';

xdescribe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: StudentsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StudentsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<StudentsEffects>(StudentsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
