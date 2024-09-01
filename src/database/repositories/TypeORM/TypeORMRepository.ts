import {EntityTarget, ObjectLiteral, Repository} from "typeorm";
import connector from "../../TypeORMDatabaseConnector";

export abstract class TypeORMRepository<T extends ObjectLiteral> {
    protected typeOrmRepository: Repository<T>;

    protected constructor(entity: EntityTarget<T>) {
        this.typeOrmRepository = connector.getDataSource().getRepository(entity);
    }
}