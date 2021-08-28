import { repository, } from '@loopback/repository';
import { get, getModelSchemaRef, param, } from '@loopback/rest';
import { Company, Vacancy, } from '../models';
import { VacancyRepository } from '../repositories';

export class VacancyCompanyController {
    constructor(
        @repository(VacancyRepository)
        public vacancyRepository: VacancyRepository,
    ) {
    }

    @get('/vacancies/{id}/company', {
        responses: {
            '200': {
                description: 'Company belonging to Vacancy',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(Company)},
                    },
                },
            },
        },
    })
    async getCompany(
        @param.path.number('id') id: typeof Vacancy.prototype.id,
    ): Promise<Company> {
        return this.vacancyRepository.id_comapny_fk(id);
    }
}
