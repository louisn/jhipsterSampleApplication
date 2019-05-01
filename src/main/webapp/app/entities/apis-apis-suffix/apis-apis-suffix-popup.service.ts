import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ApisApisSuffix } from './apis-apis-suffix.model';
import { ApisApisSuffixService } from './apis-apis-suffix.service';

@Injectable()
export class ApisApisSuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private apisService: ApisApisSuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.apisService.find(id)
                    .subscribe((apisResponse: HttpResponse<ApisApisSuffix>) => {
                        const apis: ApisApisSuffix = apisResponse.body;
                        apis.dateAssembled = this.datePipe
                            .transform(apis.dateAssembled, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.apisModalRef(component, apis);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.apisModalRef(component, new ApisApisSuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    apisModalRef(component: Component, apis: ApisApisSuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.apis = apis;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
