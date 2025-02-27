/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { lazy } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import type { ExpressionRenderDefinition } from 'src/plugins/expressions';
import type { TileMapVisRenderValue } from './tile_map_fn';
import { LazyWrapper } from '../../lazy_wrapper';
import { TILE_MAP_RENDER } from './types';

const getLazyComponent = () => {
  return lazy(() => import('./tile_map_visualization'));
};

export const tileMapRenderer = {
  name: TILE_MAP_RENDER,
  reuseDomNode: true,
  render: async (domNode, { filters, query, timeRange, visConfig }, handlers) => {
    handlers.onDestroy(() => {
      unmountComponentAtNode(domNode);
    });

    const props = {
      onInitialRenderComplete: () => {
        handlers.done();
      },
      filters,
      query,
      timeRange,
      visConfig,
    };

    render(<LazyWrapper getLazyComponent={getLazyComponent} lazyComponentProps={props} />, domNode);
  },
} as ExpressionRenderDefinition<TileMapVisRenderValue>;
