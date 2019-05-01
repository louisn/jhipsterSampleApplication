import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ApisApisSuffix } from './apis-apis-suffix.model';
import { ApisApisSuffixService } from './apis-apis-suffix.service';

@Component({
    selector: 'jhi-apis-apis-suffix-detail',
    templateUrl: './apis-apis-suffix-detail.component.html'
})
export class ApisApisSuffixDetailComponent implements OnInit, OnDestroy {

    apis: ApisApisSuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private apisService: ApisApisSuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInApis();
    }

    load(id) {
        this.apisService.find(id)
            .subscribe((apisResponse: HttpResponse<ApisApisSuffix>) => {
                this.apis = apisResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInApis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'apisListModification',
            (response) => this.load(this.apis.id)
        );
    }
}
