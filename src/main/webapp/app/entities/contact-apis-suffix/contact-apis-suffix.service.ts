import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ContactApisSuffix } from './contact-apis-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ContactApisSuffix>;

@Injectable()
export class ContactApisSuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/contacts';

    constructor(private http: HttpClient) { }

    create(contact: ContactApisSuffix): Observable<EntityResponseType> {
        const copy = this.convert(contact);
        return this.http.post<ContactApisSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(contact: ContactApisSuffix): Observable<EntityResponseType> {
        const copy = this.convert(contact);
        return this.http.put<ContactApisSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ContactApisSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ContactApisSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ContactApisSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ContactApisSuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ContactApisSuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ContactApisSuffix[]>): HttpResponse<ContactApisSuffix[]> {
        const jsonResponse: ContactApisSuffix[] = res.body;
        const body: ContactApisSuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ContactApisSuffix.
     */
    private convertItemFromServer(contact: ContactApisSuffix): ContactApisSuffix {
        const copy: ContactApisSuffix = Object.assign({}, contact);
        return copy;
    }

    /**
     * Convert a ContactApisSuffix to a JSON which can be sent to the server.
     */
    private convert(contact: ContactApisSuffix): ContactApisSuffix {
        const copy: ContactApisSuffix = Object.assign({}, contact);
        return copy;
    }
}
