<template>
 <VDatePicker
  v-model="date"
  :class="classObject"
  :is-dark="isDark"
 />
</template>

<script setup lang="ts">
import { DatePicker as VDatePicker } from 'v-calendar';
import './index.css';
import type { DatePickerModel } from 'v-calendar/dist/types/src/use/datePicker.js';
import { useStateComponent, StateComponentProps } from '../../../composables/view-state/useState/useStateComponent';
import { useDarkState } from '../../../composables/utils/useDarkState';
import { defineModel } from '#imports';
//
const props = defineProps({
 ...StateComponentProps,
});
const date = defineModel<DatePickerModel>();
//
const isDark = useDarkState();
const { classObject } = useStateComponent(props, date);
</script>
