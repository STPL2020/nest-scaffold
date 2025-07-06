
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryParserService {
  parse(query: any) {
    const where = query.filters ? JSON.parse(query.filters) : {};
    const order = query.sort
      ? Object.fromEntries(query.sort.split(',').map((s: string) => {
          const [key, value] = s.split(':');
          return [key, value?.toUpperCase() ?? 'ASC'];
        }))
      : {};

    const select = query.fields ? query.fields.split(',') : undefined;
    const relations = query.populate ? query.populate.split(',') : undefined;

    const take = query.pageSize ? Number(query.pageSize) : 10;
    const skip = query.page ? (Number(query.page) - 1) * take : 0;

    return { where, order, select, relations, take, skip };
  }
}
