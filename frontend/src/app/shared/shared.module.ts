import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from './components/button.components';
import { InputTextComponent, InputTextWithLabelComponent, InputPasswordComponent } from './components/input-text.components';
import { AbstractInputTextComponent } from './components/abstracts/input-text.components';
import { AbstractNgModelComponent } from './components/abstracts/ng-components';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Do declare components, directives, and pipes in a shared module
// when those items will be re-used and referenced by the components declared in other feature modules.

// Consider not providing services in shared modules.
// Why? A lazy loaded feature module that imports this shared module will make its own copy of the service and likely have undesirable results.
// Services are usually singletons that are provided once for the entire application or in a particular feature module.

// 中文解釋: SharedModule目的為提供共用組件，所以會被多個module引用，每次被引用時angular會建立一個copy
//          Service常用在共用資料的用途，所以service不建議寫在這裡，應寫在CoreModule裡

@NgModule({
  declarations: [
    AbstractNgModelComponent,
    AbstractInputTextComponent,
    InputTextComponent,
    InputTextWithLabelComponent,
    InputPasswordComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    InputTextComponent,
    InputTextWithLabelComponent,
    InputPasswordComponent,
    ButtonComponent
  ],
  providers: [
    // ng-bootstrap日期的資料格式使用 navtive api
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ]
})
export class SharedModule { }
