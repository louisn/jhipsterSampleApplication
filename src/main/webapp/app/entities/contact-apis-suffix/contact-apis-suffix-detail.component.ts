import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ContactApisSuffix } from './contact-apis-suffix.model';
import { ContactApisSuffixService } from './contact-apis-suffix.service';

@Component({
    selector: 'jhi-contact-apis-suffix-detail',
    templateUrl: './contact-apis-suffix-detail.component.html'
})
export class ContactApisSuffixDetailComponent implements OnInit, OnDestroy {

    contact: ContactApisSuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private contactService: ContactApisSuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInContacts();
    }

    load(id) {
        this.contactService.find(id)
            .subscribe((contactResponse: HttpResponse<ContactApisSuffix>) => {
                this.contact = contactResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInContacts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'contactListModification',
            (response) => this.load(this.contact.id)
        );
    }
}
