
import {
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Put,
  Controller,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiQuery, 
  ApiOperation, 
  ApiResponse, 
  ApiParam,
  ApiBody 
} from '@nestjs/swagger';
import { Repository, ObjectLiteral } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParserService } from '../services/query-parser.service';
import { QueryParamsDto } from '../dto/query-params.dto';

export function createAutoCrudController<T extends ObjectLiteral>(
  entity: any, 
  route: string,
  createDto?: any,
  updateDto?: any
): any {
  @ApiTags(route)
  @Controller(route)
  class BaseCrudController {
    constructor(
      @InjectRepository(entity)
      private readonly repo: Repository<T>,
      private readonly queryParser: QueryParserService,
    ) {}

    @Get()
    @ApiOperation({ summary: `Get all ${route}` })
    @ApiResponse({ 
      status: 200, 
      description: `List of ${route} retrieved successfully`,
      type: [entity]
    })
    @ApiQuery({ name: 'filters', required: false, description: 'Filter criteria' })
    @ApiQuery({ name: 'locale', required: false, description: 'Locale filter' })
    @ApiQuery({ name: 'status', required: false, description: 'Status filter' })
    @ApiQuery({ name: 'populate', required: false, description: 'Relations to populate' })
    @ApiQuery({ name: 'fields', required: false, description: 'Fields to select' })
    @ApiQuery({ name: 'sort', required: false, description: 'Sort criteria' })
    @ApiQuery({ name: 'page', required: false, description: 'Page number' })
    @ApiQuery({ name: 'pageSize', required: false, description: 'Items per page' })
    async findAll(@Query() query: QueryParamsDto) {
      const options = this.queryParser.parse(query);
      return this.repo.find(options as any);
    }

    @Get(':id')
    @ApiOperation({ summary: `Get a ${route.slice(0, -1)} by ID` })
    @ApiParam({ name: 'id', description: `${route.slice(0, -1)} ID` })
    @ApiResponse({ 
      status: 200, 
      description: `${route.slice(0, -1)} retrieved successfully`,
      type: entity
    })
    @ApiResponse({ status: 404, description: `${route.slice(0, -1)} not found` })
    async findOne(@Param('id') id: string) {
      return this.repo.findOne({ where: { id } as any });
    }

    @Post()
    @ApiOperation({ summary: `Create a new ${route.slice(0, -1)}` })
    @ApiBody({ type: createDto || entity })
    @ApiResponse({ 
      status: 201, 
      description: `${route.slice(0, -1)} created successfully`,
      type: entity
    })
    async create(@Body() data: any) {
      return this.repo.save(data);
    }

    @Put(':id')
    @ApiOperation({ summary: `Update a ${route.slice(0, -1)}` })
    @ApiParam({ name: 'id', description: `${route.slice(0, -1)} ID` })
    @ApiBody({ type: updateDto || entity })
    @ApiResponse({ 
      status: 200, 
      description: `${route.slice(0, -1)} updated successfully`,
      type: entity
    })
    @ApiResponse({ status: 404, description: `${route.slice(0, -1)} not found` })
    async update(@Param('id') id: string, @Body() data: any) {
      await this.repo.update(id, data);
      return this.repo.findOne({ where: { id } as any });
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete a ${route.slice(0, -1)}` })
    @ApiParam({ name: 'id', description: `${route.slice(0, -1)} ID` })
    @ApiResponse({ 
      status: 200, 
      description: `${route.slice(0, -1)} deleted successfully`,
      schema: { type: 'object', properties: { deleted: { type: 'boolean' } } }
    })
    @ApiResponse({ status: 404, description: `${route.slice(0, -1)} not found` })
    async remove(@Param('id') id: string) {
      await this.repo.delete(id);
      return { deleted: true };
    }
  }

  return BaseCrudController;
}
