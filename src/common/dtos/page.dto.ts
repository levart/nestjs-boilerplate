import { ApiProperty } from '@nestjs/swagger';

interface IPageMeta {
  totalCount: number;
  page: number;
  limit: number;
}

export class PaginationDto<T> {
  @ApiProperty({
    isArray: true,
  })
  readonly data: T[];

  @ApiProperty()
  readonly totalCount: number;

  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly limit: number;

  constructor(data, { totalCount, page, limit }: IPageMeta) {
    this.data = data;
    this.totalCount = totalCount;
    this.page = page;
    this.limit = limit;
  }
}
