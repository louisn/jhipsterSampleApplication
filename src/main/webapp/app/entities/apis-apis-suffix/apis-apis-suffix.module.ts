import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    ApisApisSuffixService,
    ApisApisSuffixPopupService,
    ApisApisSuffixComponent,
    ApisApisSuffixDetailComponent,
    ApisApisSuffixDialogComponent,
    ApisApisSuffixPopupComponent,
    ApisApisSuffixDeletePopupComponent,
    ApisApisSuffixDeleteDialogComponent,
    apisRoute,
    apisPopupRoute,
} from './';

const ENTITY_STATES = [
    ...apisRoute,
    ...apisPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ApisApisSuffixComponent,
        ApisApisSuffixDetailComponent,
        ApisApisSuffixDialogComponent,
        ApisApisSuffixDeleteDialogComponent,
        ApisApisSuffixPopupComponent,
        ApisApisSuffixDeletePopupComponent,
    ],
    entryComponents: [
        ApisApisSuffixComponent,
        ApisApisSuffixDialogComponent,
        ApisApisSuffixPopupComponent,
        ApisApisSuffixDeleteDialogComponent,
        ApisApisSuffixDeletePopupComponent,
    ],
    providers: [
        ApisApisSuffixService,
        ApisApisSuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationApisApisSuffixModule {}
