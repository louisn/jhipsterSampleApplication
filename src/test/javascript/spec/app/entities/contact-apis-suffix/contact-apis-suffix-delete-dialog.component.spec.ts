/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ContactApisSuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/contact-apis-suffix/contact-apis-suffix-delete-dialog.component';
import { ContactApisSuffixService } from '../../../../../../main/webapp/app/entities/contact-apis-suffix/contact-apis-suffix.service';

describe('Component Tests', () => {

    describe('ContactApisSuffix Management Delete Component', () => {
        let comp: ContactApisSuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ContactApisSuffixDeleteDialogComponent>;
        let service: ContactApisSuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ContactApisSuffixDeleteDialogComponent],
                providers: [
                    ContactApisSuffixService
                ]
            })
            .overrideTemplate(ContactApisSuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactApisSuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactApisSuffixService);
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
