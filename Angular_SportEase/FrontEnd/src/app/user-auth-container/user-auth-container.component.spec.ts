import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthContainerComponent } from './user-auth-container.component';

describe('UserAuthContainerComponent', () => {
  let component: UserAuthContainerComponent;
  let fixture: ComponentFixture<UserAuthContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAuthContainerComponent]
    });
    fixture = TestBed.createComponent(UserAuthContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
