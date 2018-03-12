import { BaseEntity } from './../../shared';

export class ApisApisSuffix implements BaseEntity {
    constructor(
        public id?: string,
        public flightType?: string,
        public dateAssembled?: any,
        public emergencyContactEmail?: string,
        public itinerary?: string,
        public aircraft?: string,
        public crew?: string,
        public passenger?: string,
    ) {
    }
}
