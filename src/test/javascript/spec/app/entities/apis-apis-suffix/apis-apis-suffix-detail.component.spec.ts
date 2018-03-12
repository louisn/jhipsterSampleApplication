/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ApisApisSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/apis-apis-suffix/apis-apis-suffix-detail.component';
import { ApisApisSuffixService } from '../../../../../../main/webapp/app/entities/apis-apis-suffix/apis-apis-suffix.service';
import { ApisApisSuffix } from '../../../../../../main/webapp/app/entities/apis-apis-suffix/apis-apis-suffix.model';

describe('Component Tests', () => {

    describe('ApisApisSuffix Management Detail Component', () => {
        let comp: ApisApisSuffixDetailComponent;
        let fixture: ComponentFixture<ApisApisSuffixDetailComponent>;
        let service: ApisApisSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ApisApisSuffixDetailComponent],
                providers: [
                    ApisApisSuffixService
                ]
            })
            .overrideTemplate(ApisApisSuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApisApisSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApisApisSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ApisApisSuffix('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.apis).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
