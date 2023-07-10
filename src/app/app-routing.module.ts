import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfComponent } from './components/pdf/pdf.component';

const routes: Routes = [
  {
    component: PdfComponent,
    path: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
