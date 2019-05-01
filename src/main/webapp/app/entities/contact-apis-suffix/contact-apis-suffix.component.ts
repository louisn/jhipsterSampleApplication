import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ContactApisSuffix } from './contact-apis-suffix.model';
import { ContactApisSuffixService } from './contact-apis-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-contact-apis-suffix',
    templateUrl: './contact-apis-suffix.component.html'
})
export class ContactApisSuffixComponent implements OnInit, OnDestroy {
contacts: ContactApisSuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private contactService: ContactApisSuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.contactService.query().subscribe(
            (res: HttpResponse<ContactApisSuffix[]>) => {
                this.contacts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInContacts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ContactApisSuffix) {
        return item.id;
    }
    registerChangeInContacts() {
        this.eventSubscriber = this.eventManager.subscribe('contactListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
