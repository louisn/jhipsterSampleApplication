/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ContactApisSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/contact-apis-suffix/contact-apis-suffix-detail.component';
import { ContactApisSuffixService } from '../../../../../../main/webapp/app/entities/contact-apis-suffix/contact-apis-suffix.service';
import { ContactApisSuffix } from '../../../../../../main/webapp/app/entities/contact-apis-suffix/contact-apis-suffix.model';

describe('Component Tests', () => {

    describe('ContactApisSuffix Management Detail Component', () => {
        let comp: ContactApisSuffixDetailComponent;
        let fixture: ComponentFixture<ContactApisSuffixDetailComponent>;
        let service: ContactApisSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ContactApisSuffixDetailComponent],
                providers: [
                    ContactApisSuffixService
                ]
            })
            .overrideTemplate(ContactApisSuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactApisSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactApisSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ContactApisSuffix('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.contact).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
