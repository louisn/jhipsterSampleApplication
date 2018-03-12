import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ApisApisSuffix } from './apis-apis-suffix.model';
import { ApisApisSuffixService } from './apis-apis-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-apis-apis-suffix',
    templateUrl: './apis-apis-suffix.component.html'
})
export class ApisApisSuffixComponent implements OnInit, OnDestroy {
apis: ApisApisSuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private apisService: ApisApisSuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.apisService.query().subscribe(
            (res: HttpResponse<ApisApisSuffix[]>) => {
                this.apis = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInApis();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ApisApisSuffix) {
        return item.id;
    }
    registerChangeInApis() {
        this.eventSubscriber = this.eventManager.subscribe('apisListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
