import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, repository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Company, Vacancy, VacancyRelations } from '../models';
import { CompanyRepository } from './company.repository';

export class VacancyRepository extends DefaultCrudRepository<Vacancy,
    typeof Vacancy.prototype.id,
    VacancyRelations> {

    public readonly id_comapny_fk: BelongsToAccessor<Company, typeof Vacancy.prototype.id>;

    constructor(
        @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CompanyRepository') protected companyRepositoryGetter: Getter<CompanyRepository>,
    ) {
        super(Vacancy, dataSource);
        this.id_comapny_fk = this.createBelongsToAccessorFor('id_comapny_fk', companyRepositoryGetter,);
        this.registerInclusionResolver('id_comapny_fk', this.id_comapny_fk.inclusionResolver);
    }
}
