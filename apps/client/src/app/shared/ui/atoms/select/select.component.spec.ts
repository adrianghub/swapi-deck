import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent<string>;
  let fixture: ComponentFixture<SelectComponent<string>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgFor,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(SelectComponent<string>);
    component = fixture.componentInstance;
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create component with requried fields', () => {
    expect(component).toBeTruthy();
    expect(component.control).toBeDefined();
    expect(component.options).toBeDefined();
  });

  it('should have no label by default', () => {
    expect(component.label).toBeFalsy();
  });

  it('should have no placeholder by default', () => {
    expect(component.placeholder).toBeFalsy();
  });

  it('should have no hint by default', () => {
    expect(component.hint).toBeFalsy();
  });

  it('should have empty options array by default', () => {
    expect(component.options).toEqual([]);
  });

  it('should have the correct label when set', () => {
    const testLabel = 'Test Label';
    component.label = testLabel;
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('mat-label');
    expect(labelElement.textContent).toContain(testLabel);
  });
});
