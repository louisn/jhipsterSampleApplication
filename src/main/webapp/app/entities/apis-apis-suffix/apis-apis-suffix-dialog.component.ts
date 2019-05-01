import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ApisApisSuffix } from './apis-apis-suffix.model';
import { ApisApisSuffixPopupService } from './apis-apis-suffix-popup.service';
import { ApisApisSuffixService } from './apis-apis-suffix.service';

@Component({
    selector: 'jhi-apis-apis-suffix-dialog',
    templateUrl: './apis-apis-suffix-dialog.component.html'
})
export class ApisApisSuffixDialogComponent implements OnInit {

    apis: ApisApisSuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private apisService: ApisApisSuffixService,
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
        if (this.apis.id !== undefined) {
            this.subscribeToSaveResponse(
                this.apisService.update(this.apis));
        } else {
            this.subscribeToSaveResponse(
                this.apisService.create(this.apis));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ApisApisSuffix>>) {
        result.subscribe((res: HttpResponse<ApisApisSuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ApisApisSuffix) {
        this.eventManager.broadcast({ name: 'apisListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-apis-apis-suffix-popup',
    template: ''
})
export class ApisApisSuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private apisPopupService: ApisApisSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.apisPopupService
                    .open(ApisApisSuffixDialogComponent as Component, params['id']);
            } else {
                this.apisPopupService
                    .open(ApisApisSuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
