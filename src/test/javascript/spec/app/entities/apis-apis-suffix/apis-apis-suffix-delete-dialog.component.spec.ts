/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ApisApisSuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/apis-apis-suffix/apis-apis-suffix-delete-dialog.component';
import { ApisApisSuffixService } from '../../../../../../main/webapp/app/entities/apis-apis-suffix/apis-apis-suffix.service';

describe('Component Tests', () => {

    describe('ApisApisSuffix Management Delete Component', () => {
        let comp: ApisApisSuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ApisApisSuffixDeleteDialogComponent>;
        let service: ApisApisSuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ApisApisSuffixDeleteDialogComponent],
                providers: [
                    ApisApisSuffixService
                ]
            })
            .overrideTemplate(ApisApisSuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApisApisSuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApisApisSuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete('123');
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith('123');
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
