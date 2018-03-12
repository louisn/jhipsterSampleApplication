/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ApisApisSuffixComponent } from '../../../../../../main/webapp/app/entities/apis-apis-suffix/apis-apis-suffix.component';
import { ApisApisSuffixService } from '../../../../../../main/webapp/app/entities/apis-apis-suffix/apis-apis-suffix.service';
import { ApisApisSuffix } from '../../../../../../main/webapp/app/entities/apis-apis-suffix/apis-apis-suffix.model';

describe('Component Tests', () => {

    describe('ApisApisSuffix Management Component', () => {
        let comp: ApisApisSuffixComponent;
        let fixture: ComponentFixture<ApisApisSuffixComponent>;
        let service: ApisApisSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ApisApisSuffixComponent],
                providers: [
                    ApisApisSuffixService
                ]
            })
            .overrideTemplate(ApisApisSuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApisApisSuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApisApisSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ApisApisSuffix('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.apis[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
