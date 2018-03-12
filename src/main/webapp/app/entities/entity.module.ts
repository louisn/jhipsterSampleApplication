import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationApisApisSuffixModule } from './apis-apis-suffix/apis-apis-suffix.module';
import { JhipsterSampleApplicationContactApisSuffixModule } from './contact-apis-suffix/contact-apis-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterSampleApplicationApisApisSuffixModule,
        JhipsterSampleApplicationContactApisSuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
