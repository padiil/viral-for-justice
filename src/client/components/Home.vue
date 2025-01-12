<script setup>
import { ref, onMounted } from 'vue';
import Avatar from 'primevue/avatar';
import Chip from 'primevue/chip';
import Skeleton from 'primevue/skeleton';
import 'primeicons/primeicons.css';

const threads = ref([]);
const loading = ref(true);

const fetchThreads = async () => {
  try {
    const response = await fetch('http://localhost:3000/cases');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();

    // Transform data berdasarkan respons API
    const threadsWithCategories = data.map((thread) => {
      // Ambil nama kategori dari ID dalam "examples"
      const exampleNames = thread.examples.map((exampleId) => {
        const matchedCategory = thread.categories.find((cat) =>
          cat.examples.some((example) => example._id === exampleId)
        );
        return matchedCategory
          ? matchedCategory.examples.find((example) => example._id === exampleId)?.name
          : 'Unknown';
      });

      return {
        id: thread._id,
        user: thread.author?.username || 'Anonymous',
        content: thread.content || 'No content available.',
        categories: exampleNames.length ? exampleNames : ['Uncategorized'],
        upvotes: thread.upvotes || 0,
        downvotes: thread.downvotes || 0,
        comments: thread.comments.length || 0,
      };
    });

    threads.value = threadsWithCategories;
    console.log('Threads:', threads.value);
  } catch (error) {
    console.error('Error fetching threads:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchThreads();
});
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Cases</h1>
    </header>
    <main class="app-main">
      <div v-if="loading" class="skeleton-list">
        <div v-for="n in 5" :key="n" class="skeleton-item flex items-start p-4 rounded-lg mb-4">
          <Skeleton shape="circle" size="2.5rem" class="mr-4" />
          <div class="flex-1">
            <Skeleton width="50%" class="mb-2" />
            <Skeleton width="100%" class="mb-2" />
            <Skeleton width="75%" class="mb-2" />
            <div class="flex space-x-4">
              <Skeleton width="2rem" height="1rem" />
              <Skeleton width="2rem" height="1rem" />
              <Skeleton width="2rem" height="1rem" />
              <Skeleton width="2rem" height="1rem" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="threads-list space-y-4">
        <div v-for="thread in threads" :key="thread.id" class="thread flex items-start p-4 rounded-lg">
          <Avatar icon="pi pi-user" class="mr-4" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
          <div class="flex-1">
            <p class="font-bold">{{ thread.user }}</p>
            <p class="thread-text">{{ thread.content }}</p>
            <div class="thread-actions flex space-x-4 text-gray-500">
              <div class="action flex items-center space-x-1">
                <i class="pi pi-arrow-up"></i>
                <span>{{ thread.upvotes }}</span>
              </div>
              <div class="action flex items-center space-x-1">
                <i class="pi pi-arrow-down"></i>
                <span>{{ thread.downvotes }}</span>
              </div>
              <div class="action flex items-center space-x-1">
                <i class="pi pi-comments"></i>
                <span>{{ thread.comments }}</span>
              </div>
              <div class="action flex items-center space-x-1">
                <i class="pi pi-send"></i>
              </div>
            </div>
            <div class="categories mt-2 flex flex-wrap gap-2">
              <Chip v-for="(category, index) in thread.categories" :key="index" :label="category"
                class="category-chip" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  font-family: 'Roboto', sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 20px;
}

.threads-list {
  border-top: 1px solid #ddd;
  padding-top: 20px;
}

.thread {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}

.thread-user {
  font-weight: bold;
  color: #333;
  margin: 0;
}

.thread-text {
  margin: 5px 0;
  color: #555;
}

.thread-actions {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.action {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #888;
  cursor: pointer;
  transition: color 0.3s;
}

.action:hover {
  color: #007bff;
}

.categories {
  margin-top: 10px;
}

.category-chip {
  margin-right: 5px;
}
</style>
