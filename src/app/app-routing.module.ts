import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PdfComponent } from './feature/pdf/pdf.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./feature/dashboard/dashboard.module').then(
            (mod) => mod.DashboardModule
          ),
      },
      // {
      //   path: 'home',
      //   loadChildren: () =>
      //     import('./feature/home/home.module').then((mod) => mod.HomeModule),
      // },
      // {
      //   path: 'notification',
      //   loadChildren: () =>
      //     import('./feature/notification').then((mod) => mod.NotiicfationComponent),
      // },
      
      // {
      //   path: 'users',
      //   loadChildren: () =>
      //     import('./feature/users/users.module').then((mod) => mod.UsersModule),
      // },
      // {
      //   path: 'transactions',
      //   loadChildren: () =>
      //     import('./feature/transactions/transactions.module').then((mod) => mod.TransactionsModule),
      // },
      // {
      //   path: 'subscriptions',
      //   loadChildren: () =>
      //     import('./feature/subscriptions/subscriptions.module').then(
      //       (mod) => mod.SubscriptionsModule
      //     ),
      // },
      // {
      //   path: 'clients',
      //   loadChildren: () =>
      //     import('./feature/clients/clients.module').then(
      //       (mod) => mod.ClientsModule
      //     )
      // },
      {
        path: 'operations',
        loadChildren: () =>
          import('./feature/operations/operations.module').then(
            (mod) => mod.OperationsModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./feature/profile/profile.module').then(
            (mod) => mod.ProfileModule
          ),
      },
      {
        path: 'pdf',
        component: PdfComponent
      },
      // {
      //   path: 'audit-logs',
      //   loadChildren: () =>
      //     import('./feature/audit-logs/audit-logs.module').then(
      //       (mod) => mod.AuditLogsModule
      //     ),
      // },
      // {
      //   path: 'roles',
      //   loadChildren: () =>
      //     import('./feature/roles/roles.module').then((mod) => mod.RolesModule),
      // },
      // {
      //   path: 'subscribers',
      //   loadChildren: () =>
      //     import('./feature/subscribers/subscribers.module').then((mod) => mod.SubscribersModule),
      // },
      // {
      //   path: 'reports',
      //   loadChildren: () =>
      //     import('./feature/reports/reports.module').then((mod) => mod.ReportsModule),
      // }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
