<template>
  <section class="p-4 sm:p-8">
    <section class="mt-6">
      <h2
        class="section-title text-gray-900 dark:text-white"
      >
        Ranking of Contestants
      </h2>
      <div class="flex items-center justify-between mb-4">
        <!-- Dropdowns aligned to the left -->
        <div class="flex items-center space-x-4">
          <pre>YEAR:</pre>
          <!-- Year Dropdown -->
          <Select
            v-model="selectedYear"
            :options="years"
            class="w-32"
            placeholder="Select Year"
          />

          <pre>SET:</pre>
          <Select
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
          class="flex items-center gap-2"
        >
          <AutoComplete
            v-model="selectedContestant"
            forceSelection
            :optionLabel="getInfo"
            :suggestions="filteredContestants"
            @complete="search"
          >
            <template #option="slotProps">
              <div class="flex items-center">
                <div>
                  {{
                    `${slotProps.option.Name} ${slotProps.option.Surname} - ${slotProps.option.Email}`
                  }}
                </div>
              </div>
            </template>
            <template #header>
              <div class="font-medium px-3 py-2">Available Contestants</div>
            </template>
            <template #footer>
              <div class="px-3 py-3">
                <Button
                  label="Add New"
                  fluid
                  severity="secondary"
                  text
                  size="small"
                  icon="pi pi-plus"
                  @click="isCreatingContestant = true"
                />
              </div>
            </template>
          </AutoComplete>

          <Button
            icon="pi pi-plus"
            label="Add Result"
            @click="addContestantResult()"
            class=""
          />
          <Button label="Edit" @click="edditing = !edditing" class="" />
        </div>
      </div>

      <!-- Adding user -->
      <div v-if="(userRole === 'admin' || userRole === 'editor') && isLoggedIn">
        <div class="flex justify-end">
          <div v-if="isCreatingContestant" class="flex w-full justify-between gap-2">
            <div class="flex flex-wrap gap-2">
              <InputText
                v-model="newContestant.name"
                placeholder="Name"
                :invalid="!validName(newContestant.name)"
              />
              <InputText
                v-model="newContestant.surname"
                placeholder="Surname"
                :invalid="!validName(newContestant.surname)"
              />
              <InputText
                v-model="newContestant.email"
                placeholder="E-mail"
                :invalid="!validEmail(newContestant.email)"
              />
              <InputText v-model="newContestant.city" placeholder="City" />
              <InputText
                v-model="newContestant.grade"
                placeholder="Grade"
                :invalid="!validGrade(newContestant.grade)"
              />
            </div>
            <div class="flex flex-wrap gap-2 justify-end">
              <Button
                label="Confirm"
                icon="pi pi-check"
                :disabled="
                  !validName(newContestant.name) ||
                  !validName(newContestant.surname) ||
                  !validEmail(newContestant.email) ||
                  !validGrade(newContestant.grade)
                "
                severity="success"
                @click="addMyContestant(newContestant)"
              />
              <Button
                label="Cancel"
                icon="pi pi-times"
                @click="isCreatingContestant = false"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- DataTable -->
      <DataTable
        :value="filteredResults"
        sortField="total"
        :sortOrder="-1"
        class="data-table min-w-96 mt-2"
      >
        <!-- Name Column -->
        <Column header="Name" field="name" sortable>
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
        <Column header="Grade" field="grade" sortable>
          <template #body="{ data }">
            <span>{{ data.grade }}</span>
          </template>
        </Column>

        <!-- Previous Points Column -->
        <Column header="Previous points">
          <template #body="{ data }">
            <span>{{ previousPoints[data.contestant] }}</span>
          </template>
        </Column>

        <!-- Example Columns -->
        <Column header="1.Example" class="w-8">
          <template #body="{ data }">
            <template v-if="isEditing === data.contestant">
              <Select v-model="resultPoints.p1" :options="points" />
            </template>
            <template v-else>
              <span>{{ data.p1 }}</span>
            </template>
          </template>
        </Column>

        <Column header="2.Example" class="w-8">
          <template #body="{ data }">
            <template v-if="isEditing === data.contestant">
              <Select v-model="resultPoints.p2" :options="points" />
            </template>
            <template v-else>
              <span>{{ data.p2 }}</span>
            </template>
          </template>
        </Column>

        <Column header="3.Example" class="w-8">
          <template #body="{ data }">
            <template v-if="isEditing === data.contestant">
              <Select v-model="resultPoints.p3" :options="points" />
            </template>
            <template v-else>
              <span>{{ data.p3 }}</span>
            </template>
          </template>
        </Column>

        <Column header="4.Example" class="w-8">
          <template #body="{ data }">
            <template v-if="isEditing === data.contestant">
              <Select v-model="resultPoints.p4" :options="points" />
            </template>
            <template v-else>
              <span>{{ data.p4 }}</span>
            </template>
          </template>
        </Column>

        <!-- Total Points Column -->
        <Column header="Total" field="total" class="w-12" sortable>
          <template #body="{ data }">
            <span>{{ calculateTotal(data) }}</span>
          </template>
        </Column>

        <!-- Action Buttons -->
        <Column v-if="userRole === 'admin' || userRole === 'editor'" header="Actions">
          <template #body="{ data }">
            <div v-if="isEditing === data.contestant">
              <Button
                label="Confirm"
                icon="pi pi-check"
                severity="success"
                class="mr-2"
                @click="updateResultButton(data)"
              />
              <Button
                label="Cancel"
                icon="pi pi-times"
                class="mr-2"
                @click="cancelResultEdit()"
              />
            </div>
            <div v-else  class="flex justify-end items-center">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                class="mr-2"
                @click="startEditting(data)"
              />
              <Button
                label="Delete"
                icon="pi pi-trash"
                class="mr-2"
                @click="deleteResultButton(data)"
                severity="danger"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </section>
  </section>
</template>


<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Select from 'primevue/select'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import AutoComplete from 'primevue/autocomplete'
import {
  getContestants,
  getResults,
  getUserRole,
  addResult,
  addContestant,
  updateResult,
  deleteResult,
} from '@/api'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const contestants = ref([])
const dbResults = ref([])
const results = ref([])
const resultPoints = ref({
  p1: 0,
  p2: 0,
  p3: 0,
  p4: 0,
})

const isEditing = ref()
const userRole = ref('')

const selectedYear = ref()
const selectedSet = ref()
const years = ref([])
const sets = ref([])

const filteredContestants = ref([])
const selectedContestant = ref()

const isLoggedIn = ref(false)
const auth = ref()

const points = ref([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5])
const isCreatingContestant = ref(false)
const newContestant = ref({
  name: '',
  surname: '',
  email: '',
  city: '',
  grade: '',
})
const customSetOrder = ['S3', 'S2', 'S1', 'W3', 'W2', 'W1']

const filteredResults = computed(() => {
  return filterData(results.value, selectedYear.value, selectedSet.value)
    .map(result => ({
      ...result,
      total: calculateTotal(result),
    }))
    .sort((a, b) => {
      const totalA = a.total
      const totalB = b.total
      return totalB - totalA // Sort in descending order
    })
})

const previousPoints = computed(() =>
  results.value.reduce((acc, result) => {
    acc[result.contestant] = acc[result.contestant] || 0
    if (
      result.year === selectedYear.value &&
      customSetOrder.indexOf(result.set) >
        customSetOrder.indexOf(selectedSet.value) &&
      selectedSet.value.charAt(0) === result.set.charAt(0)
    ) {
      acc[result.contestant] += [result.p1, result.p2, result.p3, result.p4]
        .map(Number)
        .filter(n => !isNaN(n))
        .reduce((a, b) => a + b, 0)
    }
    return acc
  }, {}),
)

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

// VALIDATION

const validName = name => {
  const regex = /^[\p{L}']{2,}(?: [\p{L}']{2,})*$/u
  return regex.test(name)
}
const validEmail = email => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
  return regex.test(email)
}
const validGrade = grade => grade && !isNaN(grade) && grade >= 5 && grade <= 9

const getInfo = (option) => {
  return `${option.Name} ${option.Surname} - ${option.Email}`;
};

// Data manipulation
const updateData = () => {
  populateYears(dbResults.value)
  if (years.value.length > 0) {
    selectedYear.value = years.value[0] // Set the default year
    populateSetsForYear(dbResults.value, selectedYear.value) // Populate sets based on the default year
  }
  results.value = combineData(contestants.value, dbResults.value)
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
      contestant: result.contestant,
      id: result.id,
    }
  })
}

const filterData = (results, year, set) => {
  return results.filter(result => {
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

// Utility functions
const calculateTotal = data => {
  const currentTotal = [data.p1, data.p2, data.p3, data.p4]
    .map(Number)
    .filter(n => !isNaN(n))
    .reduce((a, b) => a + b, 0)

  return currentTotal + previousPoints.value[data.contestant]
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
    const indexA = customSetOrder.indexOf(a)
    const indexB = customSetOrder.indexOf(b)
    return indexA - indexB
  })

  if (sets.value.length > 0) {
    selectedSet.value = sets.value[0]
  }
}

watch(selectedYear, newYear => {
  if (newYear) {
    populateSetsForYear(dbResults.value, newYear)
  } else {
    sets.value = [] // Reset sets if no year is selected
  }
})

// API calls
const addMyContestant = async ({ contestant }) => {
  await addContestant({
    Name: contestant.name,
    Surname: contestant.surname,
    City: contestant.city,
    Grade: contestant.grade,
    Email: contestant.email,
  })

  contestants.value = await getContestants()
}

const addContestantResult = async () => {
  const contestant = selectedContestant.value
  if (!contestant) return

  const result = {
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    set: selectedSet.value,
    contestant: contestant.id,
    year: selectedYear.value,
  }

  await addResult(result)
  dbResults.value = await getResults()
  updateData()
}

const updateResultButton = async (result) => {

  const data = {
    ...result,
    p1: resultPoints.value.p1,
    p2: resultPoints.value.p2,
    p3: resultPoints.value.p3,
    p4: resultPoints.value.p4,
  }
  console.log("Data:", data)
  console.log("Data P4:", resultPoints.value)
  await updateResult(data)
  dbResults.value = await getResults()
  isEditing.value = null
  updateData()
}

const deleteResultButton = async (result) => {
  await deleteResult(result)
  dbResults.value = await getResults()
  updateData()
}

const startEditting = (result) => {
  isEditing.value = result.contestant
  resultPoints.value = {
    p1: result.p1,
    p2: result.p2,
    p3: result.p3,
    p4: result.p4,
  }
}

const cancelResultEdit = async () => {
  dbResults.value = await getResults()
  isEditing.value = null
}


// Autocomplete search
const search = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredContestants.value = [...contestants.value];
    } else {
      filteredContestants.value = contestants.value.filter((contestant) => {
        return (
          contestant.Name.toLowerCase().startsWith(event.query.toLowerCase()) ||
          contestant.Surname.toLowerCase().startsWith(event.query.toLowerCase()) ||
          contestant.Email.toLowerCase().startsWith(event.query.toLowerCase())
        );
      });
    }
  }, 250);
};
</script>
