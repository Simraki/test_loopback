import { belongsTo, Entity, model, property } from '@loopback/repository';
import { Company, CompanyWithRelations } from './company.model';

@model()
export class Vacancy extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
    })
    id?: number;

    @property({
        type: 'string',
        required: true,
    })
    name: string;

    @property({
        type: 'string',
    })
    info?: string;

    @belongsTo(() => Company, {name: 'id_comapny_fk'})
    id_company: number;

    constructor(data?: Partial<Vacancy>) {
        super(data);
    }
}

export interface VacancyRelations {
    // describe navigational properties here
    company: CompanyWithRelations
}

export type VacancyWithRelations = Vacancy & VacancyRelations;
