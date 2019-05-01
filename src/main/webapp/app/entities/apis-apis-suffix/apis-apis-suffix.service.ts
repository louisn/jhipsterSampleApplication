import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ApisApisSuffix } from './apis-apis-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ApisApisSuffix>;

@Injectable()
export class ApisApisSuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/apis';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(apis: ApisApisSuffix): Observable<EntityResponseType> {
        const copy = this.convert(apis);
        return this.http.post<ApisApisSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(apis: ApisApisSuffix): Observable<EntityResponseType> {
        const copy = this.convert(apis);
        return this.http.put<ApisApisSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ApisApisSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ApisApisSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ApisApisSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ApisApisSuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ApisApisSuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ApisApisSuffix[]>): HttpResponse<ApisApisSuffix[]> {
        const jsonResponse: ApisApisSuffix[] = res.body;
        const body: ApisApisSuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ApisApisSuffix.
     */
    private convertItemFromServer(apis: ApisApisSuffix): ApisApisSuffix {
        const copy: ApisApisSuffix = Object.assign({}, apis);
        copy.dateAssembled = this.dateUtils
            .convertDateTimeFromServer(apis.dateAssembled);
        return copy;
    }

    /**
     * Convert a ApisApisSuffix to a JSON which can be sent to the server.
     */
    private convert(apis: ApisApisSuffix): ApisApisSuffix {
        const copy: ApisApisSuffix = Object.assign({}, apis);

        copy.dateAssembled = this.dateUtils.toDate(apis.dateAssembled);
        return copy;
    }
}
