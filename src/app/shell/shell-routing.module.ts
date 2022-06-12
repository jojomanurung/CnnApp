import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

const appRoute: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [...appRoute],
  },
  {
    path: '',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
