import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ContactApisSuffix } from './contact-apis-suffix.model';
import { ContactApisSuffixPopupService } from './contact-apis-suffix-popup.service';
import { ContactApisSuffixService } from './contact-apis-suffix.service';

@Component({
    selector: 'jhi-contact-apis-suffix-delete-dialog',
    templateUrl: './contact-apis-suffix-delete-dialog.component.html'
})
export class ContactApisSuffixDeleteDialogComponent {

    contact: ContactApisSuffix;

    constructor(
        private contactService: ContactApisSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.contactService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'contactListModification',
                content: 'Deleted an contact'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contact-apis-suffix-delete-popup',
    template: ''
})
export class ContactApisSuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contactPopupService: ContactApisSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.contactPopupService
                .open(ContactApisSuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
