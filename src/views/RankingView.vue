<template>
    <section class="p-4 sm:p-8">
      <section class="mt-6">
        <h2
          class="py-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white md:text-4xl"
        >
          Manage results
        </h2>
        <DataTable :value="results" class="min-w-96 mt-2">
          <!-- Name Column -->
          <Column header="Name">
            <template #body="{ data }">
              <span>{{ `${data.name} ${data.surname}` }}</span>
            </template>
          </Column>

          <!-- City Column -->
          <Column header="City">
            <template #body="{ data }">
              <span>{{ data.city }}</span>
            </template>
          </Column>
  
          <!-- Class Column -->
          <Column header="Class">
            <template #body="{ data }">
              <span>{{ data.class }}</span>
            </template>
          </Column>
  
          <!-- Example Columns with Dropdowns -->
          <Column header="1.Example" class="w-8">
            <template #body="{ data }">
              <Dropdown v-model="data.example1" :options="points"/>
            </template>
          </Column>
  
          <Column header="2.Example" class="w-8">
            <template #body="{ data }">
              <Dropdown v-model="data.example2" :options="points"/>
            </template>
          </Column>
  
          <Column header="3.Example" class="w-8">
            <template #body="{ data }">
              <Dropdown v-model="data.example3" :options="points"/>
            </template>
          </Column>
  
          <Column header="4.Example" class="w-8">
            <template #body="{ data }">
              <Dropdown v-model="data.example4" :options="points"/>
            </template>
          </Column>
  
          <!-- Total Points Column -->
          <Column header="Total" class="w-12">
            <template #body="{ data }">
              <span>{{ calculateTotal(data) }}</span>
            </template>
          </Column>
        </DataTable>
      </section>
    </section>
    <pre>{{ x }}</pre>
    <pre>{{ y }}</pre>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Dropdown from 'primevue/dropdown';
import { getContestants, getResults } from '@/api';

  const x = ref();
  const y = ref();
  const results = ref([
    { name: 'John', surname: 'Doe', city: 'New York', class: 'A', example1: 1, example2: 2, example3: 3, example4: 4 },
    { name: 'Jane', surname: 'Smith', city: 'Los Angeles', class: 'B', example1: 2, example2: 3, example3: 4, example4: 5 },
    { name: 'Alice', surname: 'Johnson', city: 'Chicago', class: 'C', example1: 3, example2: 4, example3: 5, example4: 6 },
    { name: 'Bob', surname: 'Brown', city: 'Houston', class: 'D', example1: 4, example2: 5, example3: 6, example4: 7 },
  ]);
  //const contestants = ref([]);
  
  const points = ref([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);

  onMounted(async () => {
    x.value = await getContestants();
    y.value = await getResults();
});
  
  const calculateTotal = (data) => {
    return [data.example1, data.example2, data.example3, data.example4]
      .map(Number)
      .filter(n => !isNaN(n))
      .reduce((a, b) => a + b, 0);
  };
  </script>
  