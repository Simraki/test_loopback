import { Entity, hasMany, model, property } from '@loopback/repository';
import { Vacancy, VacancyWithRelations } from "./vacancy.model";

@model()
export class Company extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true
    })
    id: number;


    @property({
        type: 'string',
        required: true,
    })
    name: string;

    @property({
        type: 'string',
        required: true,
    })
        // eslint-disable-next-line @typescript-eslint/naming-convention
    logo_url: string;

    @property({
        type: 'string',
        required: true,
    })
    website: string;

    @property({
        type: 'string',
        default: null,
    })
    info?: string;

    @property({
        type: 'boolean',
        default: false,
    })
        // eslint-disable-next-line @typescript-eslint/naming-convention
    is_verified?: boolean;

    @hasMany(() => Vacancy, {keyTo: 'id_company'})
    vacancies: Vacancy[];

    constructor(data?: Partial<Company>) {
        super(data);
    }
}

export interface CompanyRelations {
    // describe navigational properties here
    vacancies: VacancyWithRelations[]
}

export type CompanyWithRelations = Company & CompanyRelations;
