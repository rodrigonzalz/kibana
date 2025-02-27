/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import {
  Comparator,
  ComparatorToi18nMap,
  TimeUnit,
} from '../../../../common/alerting/logs/log_threshold/types';

import { formatDurationFromTimeUnitChar, TimeUnitChar } from '../../../../../observability/common';

export const getReasonMessageForUngroupedCountAlert = (
  actualCount: number,
  expectedCount: number,
  comparator: Comparator,
  timeSize: number,
  timeUnit: TimeUnit
) =>
  i18n.translate('xpack.infra.logs.alerting.threshold.ungroupedCountAlertReasonDescription', {
    defaultMessage:
      '{actualCount, plural, one {{actualCount} log entry} other {{actualCount} log entries}} in the last {duration}. Alert when ({translatedComparator} {expectedCount}).',
    values: {
      actualCount,
      expectedCount,
      translatedComparator: ComparatorToi18nMap[comparator],
      duration: formatDurationFromTimeUnitChar(timeSize, timeUnit as TimeUnitChar),
    },
  });

export const getReasonMessageForGroupedCountAlert = (
  actualCount: number,
  expectedCount: number,
  comparator: Comparator,
  groupName: string,
  timeSize: number,
  timeUnit: TimeUnit
) =>
  i18n.translate('xpack.infra.logs.alerting.threshold.groupedCountAlertReasonDescription', {
    defaultMessage:
      '{actualCount, plural, one {{actualCount} log entry} other {{actualCount} log entries}} in the last {duration} for {groupName}. Alert when ({translatedComparator} {expectedCount}).',
    values: {
      actualCount,
      expectedCount,
      groupName,
      translatedComparator: ComparatorToi18nMap[comparator],
      duration: formatDurationFromTimeUnitChar(timeSize, timeUnit as TimeUnitChar),
    },
  });

export const getReasonMessageForUngroupedRatioAlert = (
  actualRatio: number,
  expectedRatio: number,
  comparator: Comparator,
  timeSize: number,
  timeUnit: TimeUnit
) =>
  i18n.translate('xpack.infra.logs.alerting.threshold.ungroupedRatioAlertReasonDescription', {
    defaultMessage:
      'The ratio of selected logs is {actualRatio} in the last {duration}. Alert when ({translatedComparator} {expectedRatio}).',
    values: {
      actualRatio,
      expectedRatio,
      translatedComparator: ComparatorToi18nMap[comparator],
      duration: formatDurationFromTimeUnitChar(timeSize, timeUnit as TimeUnitChar),
    },
  });

export const getReasonMessageForGroupedRatioAlert = (
  actualRatio: number,
  expectedRatio: number,
  comparator: Comparator,
  groupName: string,
  timeSize: number,
  timeUnit: TimeUnit
) =>
  i18n.translate('xpack.infra.logs.alerting.threshold.groupedRatioAlertReasonDescription', {
    defaultMessage:
      'The ratio of selected logs is {actualRatio} in the last {duration} for {groupName}. Alert when ({translatedComparator} {expectedRatio}).',
    values: {
      actualRatio,
      expectedRatio,
      groupName,
      translatedComparator: ComparatorToi18nMap[comparator],
      duration: formatDurationFromTimeUnitChar(timeSize, timeUnit as TimeUnitChar),
    },
  });
