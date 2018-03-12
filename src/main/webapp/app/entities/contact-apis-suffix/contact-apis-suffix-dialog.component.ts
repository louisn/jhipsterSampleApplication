import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ContactApisSuffix } from './contact-apis-suffix.model';
import { ContactApisSuffixPopupService } from './contact-apis-suffix-popup.service';
import { ContactApisSuffixService } from './contact-apis-suffix.service';

@Component({
    selector: 'jhi-contact-apis-suffix-dialog',
    templateUrl: './contact-apis-suffix-dialog.component.html'
})
export class ContactApisSuffixDialogComponent implements OnInit {

    contact: ContactApisSuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private contactService: ContactApisSuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.contact.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contactService.update(this.contact));
        } else {
            this.subscribeToSaveResponse(
                this.contactService.create(this.contact));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ContactApisSuffix>>) {
        result.subscribe((res: HttpResponse<ContactApisSuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ContactApisSuffix) {
        this.eventManager.broadcast({ name: 'contactListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-contact-apis-suffix-popup',
    template: ''
})
export class ContactApisSuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contactPopupService: ContactApisSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.contactPopupService
                    .open(ContactApisSuffixDialogComponent as Component, params['id']);
            } else {
                this.contactPopupService
                    .open(ContactApisSuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
