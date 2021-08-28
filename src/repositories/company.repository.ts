import { Getter, inject } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Company, CompanyRelations, Vacancy } from '../models';
import { VacancyRepository } from './vacancy.repository';

export class CompanyRepository extends DefaultCrudRepository<Company,
    typeof Company.prototype.id,
    CompanyRelations> {

    public readonly vacancies: HasManyRepositoryFactory<Vacancy, typeof Company.prototype.id>;

    constructor(
        @inject('datasources.db') dataSource: DbDataSource, @repository.getter('VacancyRepository') protected vacancyRepositoryGetter: Getter<VacancyRepository>,
    ) {
        super(Company, dataSource);
        this.vacancies = this.createHasManyRepositoryFactoryFor('vacancies', vacancyRepositoryGetter,);
        this.registerInclusionResolver('vacancies', this.vacancies.inclusionResolver);
    }
}
