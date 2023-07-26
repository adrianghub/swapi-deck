import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from './input.component';

@Component({ selector: 'sdeck-button', template: '' })
class MockButtonComponent {
  @Input() prefixIcon!: string;
  @Input() size!: string;
  @Output() clicked = new EventEmitter<Event>();
}

describe('InputComponent', () => {
  let component: InputComponent<string>;
  let fixture: ComponentFixture<InputComponent<string>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        InputComponent,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [MockButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent<string>);
    component = fixture.componentInstance;
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should have text type by default', () => {
    expect(component.type).toEqual('text');
  });

  it('should have no label by default', () => {
    expect(component.label).toBeFalsy();
  });

  it('should have no icon by default', () => {
    expect(component.icon).toBeFalsy();
  });

  it('should have no placeholder by default', () => {
    expect(component.placeholder).toBeFalsy();
  });

  it('should have no hint by default', () => {
    expect(component.hint).toBeFalsy();
  });

  it('should have no readonly by default', () => {
    expect(component.readonly).toBeFalsy();
  });

  it('should have no focus by default', () => {
    expect(component.focus).toBeFalsy();
  });

  it('should have text type', () => {
    component.type = 'text';

    expect(component.type).toEqual('text');
  });

  it('should show sdeck-button when control has a value', () => {
    component.control.setValue('Some value');
    fixture.detectChanges();
    const sdeckButton = fixture.nativeElement.querySelector('.button');
    expect(sdeckButton).toBeTruthy();
  });

  it('should not show sdeck-button when control has no value', () => {
    component.control.setValue(null);
    fixture.detectChanges();
    const sdeckButton = fixture.nativeElement.querySelector('.button');
    expect(sdeckButton).toBeFalsy();
  });

  it('should reset the control and emit cleared event when sdeck-button is clicked', () => {
    const initialValue = 'Initial value';
    component.control.setValue(initialValue);
    fixture.detectChanges();

    jest.spyOn(component.control, 'reset');
    const emitSpy = jest.spyOn(component.cleared, 'emit');

    const sdeckButton = fixture.nativeElement.querySelector('.button');
    sdeckButton.click();

    fixture.detectChanges();

    expect(component.control.reset).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });
});
