/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ContactApisSuffixComponent } from '../../../../../../main/webapp/app/entities/contact-apis-suffix/contact-apis-suffix.component';
import { ContactApisSuffixService } from '../../../../../../main/webapp/app/entities/contact-apis-suffix/contact-apis-suffix.service';
import { ContactApisSuffix } from '../../../../../../main/webapp/app/entities/contact-apis-suffix/contact-apis-suffix.model';

describe('Component Tests', () => {

    describe('ContactApisSuffix Management Component', () => {
        let comp: ContactApisSuffixComponent;
        let fixture: ComponentFixture<ContactApisSuffixComponent>;
        let service: ContactApisSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ContactApisSuffixComponent],
                providers: [
                    ContactApisSuffixService
                ]
            })
            .overrideTemplate(ContactApisSuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactApisSuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactApisSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ContactApisSuffix('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.contacts[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
