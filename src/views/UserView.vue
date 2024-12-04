<template>
  <section class="p-4 sm:p-8">
    <section class="mt-6">
      <h2
        class="py-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white md:text-4xl"
      >
        Manage instructors
      </h2>
      <div class="flex justify-end">
        <template v-if="!isCreating">
          <Button
            label="Add"
            icon="pi pi-plus"
            class="p-2"
            @click="isCreating = true"
          />
        </template>
        <template v-else>
          <div class="flex w-full justify-between gap-2">
            <div class="space-x-4">
              <InputText
                v-model="newInstructor.name"
                placeholder="Name"
                :invalid="!validName(newInstructor.name)"
              />
              <InputText
                v-model="newInstructor.role"
                placeholder="Role"
                :invalid="!newInstructor.role"
              />
              <InputText
                v-model="newInstructor.description"
                placeholder="Description"
              />
              <InputText
                v-model="newInstructor.email"
                placeholder="E-mail"
                :invalid="!validEmail(newInstructor.email)"
              />
            </div>
            <div class="space-x-2">
              <Button
                label="Confirm"
                icon="pi pi-check"
                :disabled="
                  !validName(newInstructor.name) ||
                  !validEmail(newInstructor.email) ||
                  !newInstructor.role
                "
                severity="success"
                @click="createInstructorButton()"
              />
              <Button
                label="Cancel"
                icon="pi pi-times"
                @click="isCreating = false"
              />
            </div>
          </div>
        </template>
      </div>
      <DataTable :value="instructors" class="min-w-96 mt-2">
        <Column header="Name">
          <template #body="{ data }">
            <template v-if="isEditing === data.id">
              <InputText v-model="data.name" :invalid="!validName(data.name)" />
            </template>
            <template v-else>
              <span>{{ data.name }}</span>
            </template>
          </template>
        </Column>
        <Column header="Role">
          <template #body="{ data }">
            <template v-if="isEditing === data.id">
              <InputText v-model="data.role" :invalid="!data.role" />
            </template>
            <template v-else>
              <span>{{ data.role }}</span>
            </template>
          </template>
        </Column>
        <Column header="Description">
          <template #body="{ data }">
            <template v-if="isEditing === data.id">
              <InputText v-model="data.description" />
            </template>
            <template v-else>
              <span>{{ data.description }}</span>
            </template>
          </template>
        </Column>
        <Column header="Email">
          <template #body="{ data }">
            <template v-if="isEditing === data.id">
              <InputText
                v-model="data.email"
                :invalid="!validEmail(data.email)"
              />
            </template>
            <template v-else>
              <span>{{ data.email }}</span>
            </template>
          </template>
        </Column>
        <Column class="w-24 !text-end">
          <template #body="{ data }">
            <div class="flex flex-row">
              <template v-if="isEditing === data.id">
                <Button
                  label="Confirm"
                  icon="pi pi-check"
                  :disabled="
                    !validName(data.name) ||
                    !validEmail(data.email) ||
                    !data.role
                  "
                  severity="success"
                  class="mr-2"
                  @click="updateInstructorButton(data)"
                />
                <Button
                  label="Cancel"
                  icon="pi pi-times"
                  class="mr-2"
                  @click="cancelInstructorEdit()"
                />
              </template>
              <template v-else>
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  class="mr-2"
                  @click="isEditing = data.id"
                />
                <Button
                  label="Delete"
                  icon="pi pi-trash"
                  class="mr-2"
                  @click="deleteInstructorButton(data)"
                  severity="danger"
                />
              </template>
            </div>
          </template>
        </Column>
      </DataTable>
    </section>
  </section>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { onMounted, ref } from 'vue'
import {
  getInstructors,
  createInstructor,
  updateInstructor,
  deleteInstructor,
} from '@/api'

const instructors = ref()
const loading = ref(false)
const isEditing = ref()
const isCreating = ref(false)
const newInstructor = ref({ name: '', role: '', description: '', email: '' })

// Lifecycle hook
onMounted(async () => {
  loading.value = true
  instructors.value = await getInstructors()
  loading.value = false
})

const deleteInstructorButton = async instructor => {
  await deleteInstructor(instructor)
  instructors.value = await getInstructors()
}

const updateInstructorButton = async instructor => {
  await updateInstructor(instructor)
  instructors.value = await getInstructors()
  isEditing.value = null
}

const createInstructorButton = async () => {
  await createInstructor(newInstructor.value)
  instructors.value = await getInstructors()
  newInstructor.value = { name: '', role: '', description: '', email: '' }
  isCreating.value = false
}

const cancelInstructorEdit = async () => {
  instructors.value = await getInstructors()
  isEditing.value = null
}

const validName = name => {
  const regex = /^[\p{L}']{2,}(?: [\p{L}']{2,})*$/u
  return regex.test(name)
}

const validEmail = email => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
  return regex.test(email)
}
</script>
