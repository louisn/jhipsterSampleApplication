import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    ContactApisSuffixService,
    ContactApisSuffixPopupService,
    ContactApisSuffixComponent,
    ContactApisSuffixDetailComponent,
    ContactApisSuffixDialogComponent,
    ContactApisSuffixPopupComponent,
    ContactApisSuffixDeletePopupComponent,
    ContactApisSuffixDeleteDialogComponent,
    contactRoute,
    contactPopupRoute,
} from './';

const ENTITY_STATES = [
    ...contactRoute,
    ...contactPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ContactApisSuffixComponent,
        ContactApisSuffixDetailComponent,
        ContactApisSuffixDialogComponent,
        ContactApisSuffixDeleteDialogComponent,
        ContactApisSuffixPopupComponent,
        ContactApisSuffixDeletePopupComponent,
    ],
    entryComponents: [
        ContactApisSuffixComponent,
        ContactApisSuffixDialogComponent,
        ContactApisSuffixPopupComponent,
        ContactApisSuffixDeleteDialogComponent,
        ContactApisSuffixDeletePopupComponent,
    ],
    providers: [
        ContactApisSuffixService,
        ContactApisSuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationContactApisSuffixModule {}
