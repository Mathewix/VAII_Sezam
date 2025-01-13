<template>
    <section>
      <h2
        class="section-title text-gray-900 dark:text-white"
      >
        Manage instructors
      </h2>
      <section v-if="loading">Loading...</section>
      <section v-else>
        <DataTable :value="users" class="data-table min-w-96 mt-2">
          <Column header="Icon">
            <template #body="{ data }">
                <img v-if="data.photoURL" :src="data.photoURL" alt="User icon" class="size-8 rounded-full" />
                <Avatar v-else  icon="pi pi-user" class="mr-2" shape="circle" />
              </template>
          </Column>
          <Column header="Name">
            <template #body="{ data }">
              <span>{{ data.displayName ?? data.email }}</span>
            </template>
          </Column>
          <Column header="Email">
            <template #body="{ data }">
              <span>{{ data.email }}</span>
            </template>
          </Column>
          <Column header="Role">
            <template #body="{ data }">
              <select :value="data.role" @change="event => updateRole(data, event.target.value)">
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </template>
          </Column>
        </DataTable>
      </section>
    </section>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
    import { getUsers, setRole } from '@/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Avatar from 'primevue/avatar'
  
  const users = ref([])
  const loading = ref(false)

  // Lifecycle hook
  onMounted(async () => {
    loading.value = true
    users.value = await getUsers()
    console.log(users.value)
    loading.value = false
  })
    const updateRole = (user, role) => {
      user.role = role;
      setRole(user.uid, role);
    }
    </script>