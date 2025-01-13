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
                <div>{{ `${slotProps.option.Name} ${slotProps.option.Surname} - ${slotProps.option.Email}` }}</div>
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

          <Button icon="pi pi-plus" label="Add Result" @click="addContestantResult()" class="" />
          <Button label="Edit" @click="edditing = !edditing" class="" />
        </div>
      </div>

      <div v-if="(userRole === 'admin' || userRole === 'editor') && isLoggedIn">
        <div class="flex justify-end">
          <template v-if="isCreatingContestant">
            <div class="flex w-full justify-between gap-2">
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
          </template>
        </div>
      </div>
      <DataTable
        :value="filteredResults"
        sortField="total"
        :sortOrder="-1"
        class="min-w-96 mt-2"
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
        <Column header="Previous points">
          <template #body="{ data }">
            <span>{{ previousPoints[data.contestant] }}</span>
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
        <Column header="Total" field="total" class="w-12" sortable>
          <template #body="{ data }">
            <span>{{ calculateTotal(data) }}</span>
          </template>
        </Column>
      </DataTable>
    </section>
  </section>

  <!-- delete -->
  <Button @click="addMyResults">Add my results</Button>
  <Button @click="addMyContestantBackend">Add my contestant</Button>
  <div class="flex gap-4">
    <pre>{{ contestants }}</pre>
    <pre>{{ dbResults }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import AutoComplete from 'primevue/autocomplete'
import {
  getContestants,
  getResults,
  getUserRole,
  addResult,
  addContestant,
} from '@/api'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const contestants = ref([])
const dbResults = ref([])
const results = ref([])

const edditing = ref(false)
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

const calculateTotal = data => {
  const currentTotal = [data.p1, data.p2, data.p3, data.p4]
    .map(Number)
    .filter(n => !isNaN(n))
    .reduce((a, b) => a + b, 0)

  return currentTotal + previousPoints.value[data.contestant]
}

// const customSort = (event) => {
//   const { data, order } = event;

//   // Sort based on the calculated total
//   data.sort((a, b) => {
//     const totalA = (previousPoints.value[a.contestant] || 0) + calculateTotal(a);
//     const totalB = (previousPoints.value[b.contestant] || 0) + calculateTotal(b);
//     console.log("Sorting totals:", totalA, totalB, "Order:", order);
//     return order * (totalA - totalB); // Ascending or Descending
//   });
// };

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

const addMyResults = async () => {
  const resultsS2 = [
    {
      id: '3jX0HHMyrfe1PNe25noX11',
      p1: 2,
      p2: 1.5,
      p3: 3,
      p4: 2.5,
      set: 'S2',
      contestant: '0P1rBBawmbChHP2DELTy',
      year: 2024,
    },
    {
      id: '3jX0HHMyrfe1PNe25noX12',
      p1: 3.5,
      p2: 2,
      p3: 4,
      p4: 1.5,
      set: 'S2',
      contestant: '5K5fpcT9i19C1atuqBA3',
      year: 2024,
    },
    {
      id: '3jX0HHMyrfe1PNe25noX13',
      p1: 4,
      p2: 3.5,
      p3: 2.5,
      p4: 1,
      set: 'S2',
      contestant: '6UAqn1gWWfRSRunV0Mjj',
      year: 2024,
    },
    {
      id: '3jX0HHMyrfe1PNe25noX14',
      p1: 1.5,
      p2: 2.5,
      p3: 3.5,
      p4: 4,
      set: 'S2',
      contestant: '9tA5sxs1X6bkPqVLWDe8',
      year: 2024,
    },
    {
      id: '3jX0HHMyrfe1PNe25noX15',
      p1: 2,
      p2: 3,
      p3: 1.5,
      p4: 4.5,
      set: 'S2',
      contestant: 'AAvVGYoJSCRYnpKq5qjT',
      year: 2024,
    },
    {
      id: '3jX0HHMyrfe1PNe25noX16',
      p1: 3,
      p2: 4,
      p3: 2.5,
      p4: 1,
      set: 'S2',
      contestant: 'CtPUljaXC0o8K8zf9EPL',
      year: 2024,
    },
    {
      id: '3jX0HHMyrfe1PNe25noX17',
      p1: 4.5,
      p2: 3,
      p3: 1.5,
      p4: 2,
      set: 'S2',
      contestant: 'CuyUN9mIPq34YZsXFU6P',
      year: 2024,
    },
    {
      id: '3jX0HHMyrfe1PNe25noX18',
      p1: 2.5,
      p2: 4.5,
      p3: 3,
      p4: 1.5,
      set: 'S2',
      contestant: 'Fuu9v9D4G274TKcQ7GLD',
      year: 2024,
    },
    {
      id: '3jX0HHMyrfe1PNe25noX19',
      p1: 3,
      p2: 2,
      p3: 4.5,
      p4: 1,
      set: 'S2',
      contestant: 'KNmZVKmTdakQCYW0vBHY',
      year: 2024,
    },
    {
      id: '3jX0HHMyrfe1PNe25noX20',
      p1: 1.5,
      p2: 2.5,
      p3: 3,
      p4: 4,
      set: 'S2',
      contestant: 'L89C0xRUukfLBdQFmBf5',
      year: 2024,
    },
  ]

  for (let i = 0; i < 10; i++) {
    await addResult(resultsS2[i])
  }
  dbResults.value = await getResults()
  updateData()
}

const addMyContestantBackend = async () => {
  const c = [
    {
      Name: 'John',
      Surname: 'Doe',
      City: 'New York',
      Grade: 8,
      Email: 'johnDoe@gg.com',
    },
    {
      Name: 'Jane',
      Surname: 'Smith',
      City: 'Los Angeles',
      Grade: 7,
      Email: 'janeSmith@gg.com',
    },
    {
      Name: 'Michael',
      Surname: 'Johnson',
      City: 'Chicago',
      Grade: 9,
      Email: 'michaelJohnson@gg.com',
    },
    {
      Name: 'Emily',
      Surname: 'Davis',
      City: 'Houston',
      Grade: 6,
      Email: 'emilyDavis@gg.com',
    },
    {
      Name: 'Daniel',
      Surname: 'Martinez',
      City: 'Phoenix',
      Grade: 5,
      Email: 'danielMartinez@gg.com',
    },
    {
      Name: 'Sophia',
      Surname: 'Garcia',
      City: 'Philadelphia',
      Grade: 8,
      Email: 'sophiaGarcia@gg.com',
    },
    {
      Name: 'Matthew',
      Surname: 'Rodriguez',
      City: 'San Antonio',
      Grade: 7,
      Email: 'matthewRodriguez@gg.com',
    },
    {
      Name: 'Olivia',
      Surname: 'Martinez',
      City: 'San Diego',
      Grade: 9,
      Email: 'oliviaMartinez@gg.com',
    },
    {
      Name: 'James',
      Surname: 'Hernandez',
      City: 'Dallas',
      Grade: 6,
      Email: 'jamesHernandez@gg.com',
    },
    {
      Name: 'Ava',
      Surname: 'Lopez',
      City: 'San Jose',
      Grade: 5,
      Email: 'avaLopez@gg.com',
    },
    {
      Name: 'William',
      Surname: 'Gonzalez',
      City: 'Austin',
      Grade: 8,
      Email: 'williamGonzalez@gg.com',
    },
    {
      Name: 'Isabella',
      Surname: 'Wilson',
      City: 'Jacksonville',
      Grade: 7,
      Email: 'isabellaWilson@gg.com',
    },
    {
      Name: 'Alexander',
      Surname: 'Anderson',
      City: 'Fort Worth',
      Grade: 9,
      Email: 'alexanderAnderson@gg.com',
    },
    {
      Name: 'Mia',
      Surname: 'Thomas',
      City: 'Columbus',
      Grade: 6,
      Email: 'miaThomas@gg.com',
    },
    {
      Name: 'Benjamin',
      Surname: 'Taylor',
      City: 'Charlotte',
      Grade: 5,
      Email: 'benjaminTaylor@gg.com',
    },
    {
      Name: 'Charlotte',
      Surname: 'Moore',
      City: 'San Francisco',
      Grade: 8,
      Email: 'charlotteMoore@gg.com',
    },
    {
      Name: 'Elijah',
      Surname: 'Jackson',
      City: 'Indianapolis',
      Grade: 7,
      Email: 'elijahJackson@gg.com',
    },
    {
      Name: 'Amelia',
      Surname: 'Martin',
      City: 'Seattle',
      Grade: 9,
      Email: 'ameliaMartin@gg.com',
    },
    {
      Name: 'Lucas',
      Surname: 'Lee',
      City: 'Denver',
      Grade: 6,
      Email: 'lucasLee@gg.com',
    },
    {
      Name: 'Harper',
      Surname: 'Perez',
      City: 'Washington',
      Grade: 5,
      Email: 'harperPerez@gg.com',
    },
  ]
  for (let i = 0; i < 20; i++) {
    await addContestant(c[i])
  }
  contestants.value = await getContestants()
}

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
