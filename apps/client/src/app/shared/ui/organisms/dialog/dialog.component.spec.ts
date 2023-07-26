import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { DialogComponent, DialogData } from './dialog.component';

interface MyInputData {
  labels: {
    title: string;
    submit: string;
    cancel: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitCallbackFn: jest.Mock<any, any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cancelCallbackFn: jest.Mock<any, any, any>;
  options: {
    disabled: boolean;
  };
}

class MockTemplateRef<T> extends TemplateRef<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private _elementRef: any) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createEmbeddedView(): any {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get elementRef(): any {
    return this._elementRef;
  }
}

describe('DialogComponent', () => {
  let component: DialogComponent<MyInputData, boolean>;
  let fixture: ComponentFixture<DialogComponent<MyInputData, boolean>>;

  const dialogDataMock: DialogData<MyInputData, boolean> = {
    templateRef: new MockTemplateRef({}),
    input$: of({} as MyInputData),
    labels: { title: 'Test Title', submit: 'Submit', cancel: 'Cancel' },
    submitCallbackFn: jest.fn(),
    cancelCallbackFn: jest.fn(),
    result: false,
    options: { disabled: false },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        DialogComponent,
        TranslateModule.forRoot(),
        CommonModule,
        NgTemplateOutlet,
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: dialogDataMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent<MyInputData, boolean>);
    component = fixture.componentInstance;

    component.data = {
      labels: {
        title: 'Test Title',
        submit: 'Submit',
        cancel: 'Cancel',
      },
      submitCallbackFn: jest.fn(),
      cancelCallbackFn: jest.fn(),
      options: { disabled: false },
    } as unknown as DialogData<MyInputData, boolean>;

    fixture.detectChanges();
  });

  it('should display the correct title', () => {
    const titleElement: HTMLElement = fixture.nativeElement.querySelector(
      '[data-cy="dialog-title"]'
    );
    expect(titleElement.textContent).toContain(dialogDataMock.labels.title);
  });
});
