import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ApisApisSuffix } from './apis-apis-suffix.model';
import { ApisApisSuffixPopupService } from './apis-apis-suffix-popup.service';
import { ApisApisSuffixService } from './apis-apis-suffix.service';

@Component({
    selector: 'jhi-apis-apis-suffix-delete-dialog',
    templateUrl: './apis-apis-suffix-delete-dialog.component.html'
})
export class ApisApisSuffixDeleteDialogComponent {

    apis: ApisApisSuffix;

    constructor(
        private apisService: ApisApisSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.apisService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'apisListModification',
                content: 'Deleted an apis'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-apis-apis-suffix-delete-popup',
    template: ''
})
export class ApisApisSuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private apisPopupService: ApisApisSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.apisPopupService
                .open(ApisApisSuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
