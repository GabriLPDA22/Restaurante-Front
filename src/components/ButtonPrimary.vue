<template>
    <button class="button" :type="type">
      {{ label }}
    </button>
  </template>
  
  <script setup lang="ts">
  import { defineProps, type PropType } from 'vue';
  
  defineProps({
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<'submit' | 'button' | 'reset'>,
      default: 'submit',
    },
  });
  </script>
  
  <style lang="scss" scoped>
  .button {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    background: #d8b268;
    color: #0d1b1e;
    border: 2px solid #d8b268;
    border-radius: 30px;
    cursor: pointer;
    transition: 0.3s ease;
    box-shadow: 0 4px 8px rgba(216, 178, 104, 0.3);
  
    &:hover {
      background: #b8965f;
      border-color: #b8965f;
    }
  }
  </style>
  