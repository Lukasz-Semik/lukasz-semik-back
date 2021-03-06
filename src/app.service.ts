import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findIndex, orderBy } from 'lodash';
import { Repository } from 'typeorm';

import { throwError } from 'src/helpers/throwError';

import { Record } from './entities/record.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepo: Repository<Record>
  ) {}
  private orderRecords(records: Record[]): Record[] {
    return orderBy(records, ['value'], ['desc']);
  }

  async getAllRecords(): Promise<Record[]> {
    return this.recordRepo.find();
  }

  async createRecord(value: number): Promise<number> {
    try {
      if (value === 0) {
        return 0;
      }

      const newRecord = new Record();

      const record = await this.recordRepo.save({
        ...newRecord,
        value,
      });

      const allRecords = await this.recordRepo.find();

      const recordIdsToRemove = this.orderRecords(allRecords)
        .slice(100)
        .map(r => r.id);

      this.recordRepo
        .createQueryBuilder('record')
        .delete()
        .where('record.id IN (:...ids)', { ids: recordIdsToRemove })
        .execute();

      const updatedRecrods = await this.recordRepo.find();

      const newRanking =
        findIndex(this.orderRecords(updatedRecrods), r => r.id === record.id) +
        1;

      return newRanking;
    } catch (err) {
      throwError(HttpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }
}
