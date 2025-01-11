<template>
  <section class="p-4 sm:p-8">
    <section class="mt-6">
      <h2
        class="py-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white md:text-4xl"
      >
        Ranking of Contestants
      </h2>
      <div class="flex items-center justify-between mb-4">
        <!-- Dropdowns aligned to the left -->
        <div class="flex items-center space-x-4">
          <pre>YEAR:</pre>
          <!-- Year Dropdown -->
          <Dropdown
            v-model="selectedYear"
            :options="years"
            class="w-32"
            placeholder="Select Year"
          />

          <pre>SET:</pre>
          <Dropdown
            v-model="selectedSet"
            :options="sets"
            class="w-32"
            placeholder="Select Set"
            :disabled="!selectedYear"
          />
        </div>

        <!-- Button aligned to the right -->
        <div
          v-if="(userRole === 'admin' || userRole === 'editor') && isLoggedIn"
        >
          <Button label="Edit" @click="edditing = !edditing" class="" />
        </div>
      </div>
      <DataTable :value="filteredResults" class="min-w-96 mt-2">
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

        <!-- Grade Column -->
        <Column header="Grade">
          <template #body="{ data }">
            <span>{{ data.grade }}</span>
          </template>
        </Column>
        <template v-if="edditing">
          <!-- Example Columns with Dropdowns -->
          <Column header="1.Example" class="w-8">
            <template #body="{ data }">
              <Dropdown v-model="data.p1" :options="points" />
            </template>
          </Column>

          <Column header="2.Example" class="w-8">
            <template #body="{ data }">
              <Dropdown v-model="data.p2" :options="points" />
            </template>
          </Column>

          <Column header="3.Example" class="w-8">
            <template #body="{ data }">
              <Dropdown v-model="data.p3" :options="points" />
            </template>
          </Column>

          <Column header="4.Example" class="w-8">
            <template #body="{ data }">
              <Dropdown v-model="data.p4" :options="points" />
            </template>
          </Column>
        </template>
        <template v-else>
          <!-- Example Columns -->
          <Column header="1.Example" class="w-8">
            <template #body="{ data }">
              <span>{{ data.p1 }}</span>
            </template>
          </Column>

          <Column header="2.Example" class="w-8">
            <template #body="{ data }">
              <span>{{ data.p2 }}</span>
            </template>
          </Column>

          <Column header="3.Example" class="w-8">
            <template #body="{ data }">
              <span>{{ data.p3 }}</span>
            </template>
          </Column>

          <Column header="4.Example" class="w-8">
            <template #body="{ data }">
              <span>{{ data.p4 }}</span>
            </template>
          </Column>
        </template>
        <!-- Total Points Column -->
        <Column header="Total" class="w-12">
          <template #body="{ data }">
            <span>{{ calculateTotal(data) }}</span>
          </template>
        </Column>
      </DataTable>
    </section>
  </section>
  <Button @click="addMyResults">Add my results</Button>
  <Button @click="addMyContestant">Add my contestant</Button>
  <pre>{{ contestants }}</pre>
  <pre>{{ dbResults }}</pre>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { getContestants, getResults, getUserRole, addResult, addContestant } from '@/api'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const contestants = ref([])
const dbResults = ref([])
const results = ref([])

const edditing = ref(false)
const userRole = ref('')

const selectedYear = ref(null)
const selectedSet = ref(null)
const years = ref([])
const sets = ref([])

const isLoggedIn = ref(false)
const auth = ref()

const points = ref([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5])
const customSetOrder = ['S3', 'S2', 'S1', 'W3', 'W2', 'W1']

const filteredResults = computed(() => {
  console.log("result: ", results.value)
  console.log("filter data:", filterData(results.value, selectedYear.value, selectedSet.value))
  return filterData(results.value, selectedYear.value, selectedSet.value)
})

onMounted(async () => {
  auth.value = getAuth()
  contestants.value = await getContestants()
  dbResults.value = await getResults()
  onAuthStateChanged(auth.value, user => {
    isLoggedIn.value = !!user
    if (user) {
      getCurrentUsersRole()
    } else {
      userRole.value = ''
    }
  })

  updateData()
})

const updateData = () => {
  populateYears(dbResults.value)
  if (years.value.length > 0) {
    selectedYear.value = years.value[0]; // Set the default year
    populateSetsForYear(dbResults.value, selectedYear.value); // Populate sets based on the default year
  }
  results.value = combineData(contestants.value, dbResults.value)
}

const calculateTotal = data => {
  return [data.p1, data.p2, data.p3, data.p4]
    .map(Number)
    .filter(n => !isNaN(n))
    .reduce((a, b) => a + b, 0)
}

const combineData = (contestants, results) => {
  return results.map(result => {
    const contestant = contestants.find(c => c.id === result.contestant)

    // Combine data from contestant and result into the desired structure
    return {
      name: contestant.Name,
      surname: contestant.Surname,
      city: contestant.City,
      grade: contestant.Grade,
      p1: result.p1,
      p2: result.p2,
      p3: result.p3,
      p4: result.p4,
      year: result.year,
      set: result.set,
    }
  })
  // return contestants.map(contestant => {
  //   const result = results.find(r => r.contestant === contestant.id)

  //   // Combine data from contestant and result into the desired structure
  //   return {
  //     name: contestant.Name,
  //     surname: contestant.Surname,
  //     city: contestant.City,
  //     grade: contestant.Grade,
  //     p1: result ? result.p1 : 0,
  //     p2: result ? result.p2 : 0,
  //     p3: result ? result.p3 : 0,
  //     p4: result ? result.p4 : 0,
  //     year: result ? result.year : selectedYear.value,
  //     set: result ? result.set : selectedSet.value,
  //   }
  // })
}

const filterData = (results, year, set) => {
  return results.filter(result => {
    console.log("year: ", year, "set: ", set)
    console.log("result year: ", result.year, "result set: ", result.set)
    return result.year === year && result.set === set
  })
}

const getCurrentUsersRole = async () => {
  auth.value = getAuth()
  const user = auth.value.currentUser
  if (user) {
    userRole.value = await getUserRole(user.uid)
  }
}

const populateYears = results => {
  // Extract unique years and sets from results
  const uniqueYears = new Set()

  results.forEach(result => {
    if (result.year) uniqueYears.add(result.year)
  })

  years.value = Array.from(uniqueYears).sort((a, b) => b - a) // Sort in descending order
}

const populateSetsForYear = (results, year) => {
  const uniqueSets = new Set()
  results
    .filter(result => result.year === year) // Filter by the selected year
    .forEach(result => {
      if (result.set) uniqueSets.add(result.set)
    })
    sets.value = Array.from(uniqueSets).sort((a, b) => {
    const indexA = customSetOrder.indexOf(a);
    const indexB = customSetOrder.indexOf(b);
    return indexA - indexB;
  });

  if (sets.value.length > 0) {
    selectedSet.value = sets.value[0];
  }
}

watch(selectedYear, newYear => {
  if (newYear) {
    populateSetsForYear(dbResults.value, newYear)
  } else {
    sets.value = [] // Reset sets if no year is selected
  }
})


const addMyResults = async () => {
  await addResult({
    year: 2023,
    p3: 0,
    contestant: "CtPUljaXC0o8K8zf9EPL",
    p1: 0,
    p2: 0,
    p4: 0,
    set: "W3"
  });

  dbResults.value = await getResults();
  updateData();
}

const addMyContestant = async () => {
  console.log("Adding contestant");
  await addContestant({
    Name: "John",
    Surname: "Doe",
    City: "New York",
    Grade: 8,
    Email: "johnDoe@gg.com"
  });

  contestants.value = await getContestants();
}
</script>
