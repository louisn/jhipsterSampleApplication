import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ContactApisSuffixComponent } from './contact-apis-suffix.component';
import { ContactApisSuffixDetailComponent } from './contact-apis-suffix-detail.component';
import { ContactApisSuffixPopupComponent } from './contact-apis-suffix-dialog.component';
import { ContactApisSuffixDeletePopupComponent } from './contact-apis-suffix-delete-dialog.component';

export const contactRoute: Routes = [
    {
        path: 'contact-apis-suffix',
        component: ContactApisSuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'contact-apis-suffix/:id',
        component: ContactApisSuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactPopupRoute: Routes = [
    {
        path: 'contact-apis-suffix-new',
        component: ContactApisSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contact-apis-suffix/:id/edit',
        component: ContactApisSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contact-apis-suffix/:id/delete',
        component: ContactApisSuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
