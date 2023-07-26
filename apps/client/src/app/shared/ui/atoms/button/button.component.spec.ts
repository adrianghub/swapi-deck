import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { buttonSizes, iconSizes } from './button.config';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    jest.resetAllMocks();

    TestBed.configureTestingModule({
      imports: [ButtonComponent],
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clicked event', () => {
    jest.spyOn(component.clicked, 'emit');

    component.onClick();

    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should not emit clicked event if disabled', () => {
    component.disabled = true;

    jest.spyOn(component.clicked, 'emit');

    component.onClick();

    fixture.detectChanges();

    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should have primary type by default', () => {
    expect(component.type).toEqual('primary');
  });

  it('should have medium size by default', () => {
    expect(component.size).toEqual('medium');
  });

  it('should have no label by default', () => {
    expect(component.label).toBeFalsy();
  });

  it('should have no prefix icon by default', () => {
    expect(component.prefixIcon).toBeFalsy();
  });

  it('should have no suffix icon by default', () => {
    expect(component.suffixIcon).toBeFalsy();
  });

  it('should have no disabled by default', () => {
    expect(component.disabled).toBeFalsy();
  });

  it('should have button css variables with label', () => {
    component.label = 'label';

    fixture.detectChanges();

    expect(component.buttonCssVariables).toEqual(`
      --fontSize: ${buttonSizes.medium.fontSize};
      --padding: ${buttonSizes.medium.padding};
    `);
  });

  it('should have button css variables without label', () => {
    component.label = undefined;

    expect(component.buttonCssVariables).toEqual(`
      --padding: ${iconSizes.medium.padding};
    `);
  });

  it('should have icon css variables', () => {
    expect(component.iconCssVariables).toEqual(`
      --iconWidth: ${iconSizes.medium.iconWidth};
    `);
  });
});
