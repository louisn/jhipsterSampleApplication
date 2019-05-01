import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ApisApisSuffixComponent } from './apis-apis-suffix.component';
import { ApisApisSuffixDetailComponent } from './apis-apis-suffix-detail.component';
import { ApisApisSuffixPopupComponent } from './apis-apis-suffix-dialog.component';
import { ApisApisSuffixDeletePopupComponent } from './apis-apis-suffix-delete-dialog.component';

export const apisRoute: Routes = [
    {
        path: 'apis-apis-suffix',
        component: ApisApisSuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Apis'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'apis-apis-suffix/:id',
        component: ApisApisSuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Apis'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const apisPopupRoute: Routes = [
    {
        path: 'apis-apis-suffix-new',
        component: ApisApisSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Apis'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'apis-apis-suffix/:id/edit',
        component: ApisApisSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Apis'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'apis-apis-suffix/:id/delete',
        component: ApisApisSuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Apis'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
