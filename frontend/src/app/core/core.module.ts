import { SharedModule } from './../shared/shared.module';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AlertComponent } from './components/alert/alert.component';

// CoreModule目的為提供app每個頁面都會出現的component、或者單例化service
// 註: 單例化service在angular6之後可設定 providedIn: 'root' 來實現，service不一定要寫在CoreModule裡

@NgModule({
  declarations: [AlertComponent],
  imports: [
    SharedModule
  ],
  providers: [],
  exports: [AlertComponent]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    // make sure CoreModule loaded only once.
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
