import { Count, CountSchema, Filter, FilterExcludingWhere, repository, Where, } from '@loopback/repository';
import { del, get, getModelSchemaRef, param, patch, post, put, requestBody, response, } from '@loopback/rest';
import { Vacancy } from '../models';
import { VacancyRepository } from '../repositories';

export class VacancyController {
    constructor(
        @repository(VacancyRepository)
        public vacancyRepository: VacancyRepository,
    ) {
    }

    @post('/vacancies')
    @response(200, {
        description: 'Vacancy model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vacancy)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Vacancy, {
                        title: 'NewVacancy',
                        exclude: ['id'],
                    }),
                },
            },
        })
            vacancy: Omit<Vacancy, 'id'>,
    ): Promise<Vacancy> {
        return this.vacancyRepository.create(vacancy);
    }

    @get('/vacancies/count')
    @response(200, {
        description: 'Vacancy model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(Vacancy) where?: Where<Vacancy>,
    ): Promise<Count> {
        return this.vacancyRepository.count(where);
    }

    @get('/vacancies')
    @response(200, {
        description: 'Array of Vacancy model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(Vacancy, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(Vacancy) filter?: Filter<Vacancy>,
    ): Promise<Vacancy[]> {
        return this.vacancyRepository.find(filter);
    }

    @patch('/vacancies')
    @response(200, {
        description: 'Vacancy PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Vacancy, {partial: true}),
                },
            },
        })
            vacancy: Vacancy,
        @param.where(Vacancy) where?: Where<Vacancy>,
    ): Promise<Count> {
        return this.vacancyRepository.updateAll(vacancy, where);
    }

    @get('/vacancies/{id}')
    @response(200, {
        description: 'Vacancy model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Vacancy, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Vacancy, {exclude: 'where'}) filter?: FilterExcludingWhere<Vacancy>
    ): Promise<Vacancy> {
        return this.vacancyRepository.findById(id, filter);
    }

    @patch('/vacancies/{id}')
    @response(204, {
        description: 'Vacancy PATCH success',
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Vacancy, {partial: true}),
                },
            },
        })
            vacancy: Vacancy,
    ): Promise<void> {
        await this.vacancyRepository.updateById(id, vacancy);
    }

    @put('/vacancies/{id}')
    @response(204, {
        description: 'Vacancy PUT success',
    })
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody() vacancy: Vacancy,
    ): Promise<void> {
        await this.vacancyRepository.replaceById(id, vacancy);
    }

    @del('/vacancies/{id}')
    @response(204, {
        description: 'Vacancy DELETE success',
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.vacancyRepository.deleteById(id);
    }
}
