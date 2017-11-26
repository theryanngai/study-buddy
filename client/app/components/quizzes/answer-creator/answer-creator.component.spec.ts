import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerCreatorComponent } from './answer-creator.component';

describe('AnswerCreatorComponent', () => {
  let component: AnswerCreatorComponent;
  let fixture: ComponentFixture<AnswerCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
