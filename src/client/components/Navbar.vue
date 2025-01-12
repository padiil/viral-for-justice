<script setup>
import { ref } from 'vue';
import Dock from 'primevue/dock';

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => { console.log('Home clicked'); }
    },
    {
        label: 'Search',
        icon: 'pi pi-search',
        command: () => { console.log('Search clicked'); }
    },
    {
        label: 'Add',
        icon: 'pi pi-plus',
        command: () => { console.log('Add clicked'); }
    },
    {
        label: 'Notifications',
        icon: 'pi pi-bell',
        command: () => { console.log('Notifications clicked'); }
    },
    {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => { console.log('Profile clicked'); }
    }
]);

const position = ref('bottom');
</script>

<template>
    <Dock :model="items" :position="position">
        <template #itemicon="{ item }">
            <i :class="item.icon"></i>
        </template>
    </Dock>
</template>

<style scoped>
/* Add any custom styles here */
</style>