import { Count, CountSchema, Filter, repository, Where, } from '@loopback/repository';
import { del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody, } from '@loopback/rest';
import { Company, Vacancy, } from '../models';
import { CompanyRepository } from '../repositories';

export class CompanyVacancyController {
    constructor(
        @repository(CompanyRepository) protected companyRepository: CompanyRepository,
    ) {
    }

    @get('/companies/{id}/vacancies', {
        responses: {
            '200': {
                description: 'Array of Company has many Vacancy',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(Vacancy)},
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<Vacancy>,
    ): Promise<Vacancy[]> {
        return this.companyRepository.vacancies(id).find(filter);
    }

    @post('/companies/{id}/vacancies', {
        responses: {
            '200': {
                description: 'Company model instance',
                content: {'application/json': {schema: getModelSchemaRef(Vacancy)}},
            },
        },
    })
    async create(
        @param.path.number('id') id: typeof Company.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Vacancy, {
                        title: 'NewVacancyInCompany',
                        exclude: ['id'],
                        optional: ['id_company']
                    }),
                },
            },
        }) vacancy: Omit<Vacancy, 'id'>,
    ): Promise<Vacancy> {
        return this.companyRepository.vacancies(id).create(vacancy);
    }

    @patch('/companies/{id}/vacancies', {
        responses: {
            '200': {
                description: 'Company.Vacancy PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Vacancy, {partial: true}),
                },
            },
        })
            vacancy: Partial<Vacancy>,
        @param.query.object('where', getWhereSchemaFor(Vacancy)) where?: Where<Vacancy>,
    ): Promise<Count> {
        return this.companyRepository.vacancies(id).patch(vacancy, where);
    }

    @del('/companies/{id}/vacancies', {
        responses: {
            '200': {
                description: 'Company.Vacancy DELETE success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(Vacancy)) where?: Where<Vacancy>,
    ): Promise<Count> {
        return this.companyRepository.vacancies(id).delete(where);
    }
}
