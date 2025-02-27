/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { SavedObjectsBulkCreateObject, SavedObjectsClientContract } from 'kibana/server';

import { ExceptionListSoSchema } from '../../../../schemas/saved_objects/exceptions_list_so_schema';
import { savedObjectsClientMock } from '../../../../../../../../src/core/server/mocks';
import { ENTRIES } from '../../../../../common/constants.mock';

import { bulkCreateImportedItems } from './bulk_create_imported_items';

describe('bulkCreateImportedItems', () => {
  const sampleItems: Array<SavedObjectsBulkCreateObject<ExceptionListSoSchema>> = [
    {
      attributes: {
        comments: [],
        created_at: new Date().toISOString(),
        created_by: 'elastic',
        description: 'description here',
        entries: ENTRIES,
        immutable: undefined,
        item_id: 'item-id',
        list_id: 'list-id',
        list_type: 'item',
        meta: undefined,
        name: 'my exception item',
        os_types: [],
        tags: [],
        tie_breaker_id: '123456',
        type: 'detection',
        updated_by: 'elastic',
        version: undefined,
      },
      type: 'exception-list',
    },
  ];
  let savedObjectsClient: jest.Mocked<SavedObjectsClientContract>;

  beforeEach(() => {
    savedObjectsClient = savedObjectsClientMock.create();
  });

  it('returns empty array if no items to create', async () => {
    const response = await bulkCreateImportedItems({
      itemsToCreate: [],
      savedObjectsClient,
    });

    expect(response).toEqual([]);
    expect(savedObjectsClient.bulkCreate).not.toHaveBeenCalled();
  });

  it('returns formatted error responses', async () => {
    savedObjectsClient.bulkCreate.mockResolvedValue({
      saved_objects: [
        {
          attributes: {},
          error: {
            error: 'Internal Server Error',
            message: 'Unexpected bulk response [400]',
            statusCode: 500,
          },
          id: '0dc73480-5664-11ec-af96-8349972169c7',
          references: [],
          type: 'exception-list',
        },
      ],
    });

    const response = await bulkCreateImportedItems({
      itemsToCreate: sampleItems,
      savedObjectsClient,
    });

    expect(response).toEqual([
      {
        error: {
          message: 'Unexpected bulk response [400]',
          status_code: 500,
        },
        item_id: '(unknown item_id)',
      },
    ]);
    expect(savedObjectsClient.bulkCreate).toHaveBeenCalled();
  });

  it('returns formatted success responses', async () => {
    savedObjectsClient.bulkCreate.mockResolvedValue({
      saved_objects: [
        {
          attributes: {
            description: 'some description',
            name: 'Query with a rule id',
            tags: [],
            type: 'detection',
            updated_by: 'elastic',
          },
          id: '14aec120-5667-11ec-ae56-7ddc0e93145f',
          namespaces: ['default'],
          references: [],
          type: 'exception-list',
          updated_at: '2021-12-06T07:35:27.941Z',
          version: 'WzE0MTc5MiwxXQ==',
        },
      ],
    });

    const response = await bulkCreateImportedItems({
      itemsToCreate: sampleItems,
      savedObjectsClient,
    });

    expect(response).toEqual([
      {
        id: '14aec120-5667-11ec-ae56-7ddc0e93145f',
        status_code: 200,
      },
    ]);
    expect(savedObjectsClient.bulkCreate).toHaveBeenCalled();
  });
});
