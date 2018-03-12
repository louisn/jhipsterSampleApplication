import { BaseEntity } from './../../shared';

export class ContactApisSuffix implements BaseEntity {
    constructor(
        public id?: string,
        public lastName?: string,
        public firstName?: string,
        public middleName?: string,
        public telephone?: string,
        public email?: string,
    ) {
    }
}
