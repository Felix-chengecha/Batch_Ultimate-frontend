<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Main Content -->
    <main class="flex-1 p-6 overflow-auto">
      <span class="text-lg font-semibold text-center md:text-left mb-2 md:mb-0">DOC-MANAGER:</span>

      <!-- Breadcrumbs -->
      <nav class="text-sm text-gray-600 mb-4">
        <ol class="list-reset flex space-x-2">
          <li><a href="#" class="hover:underline">Home</a></li>
          <li>/</li>
          <li><a href="#" class="hover:underline">Documents</a></li>
          <li>/</li>
          <li>All</li>
        </ol>
      </nav>

      <!-- Search & Filters -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
        <input
          type="text"
          placeholder="Search documents..."
          class="flex-1 p-2 border border-gray-300 rounded"
        />
        <select class="border border-gray-300 rounded p-2 w-48">
          <option>Date Modified</option>
          <option>Name</option>
          <option>Size</option>
        </select>
      </div>

      <!-- Document List -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="doc in documents"
          :key="doc.id"
          class="bg-white p-4 rounded shadow hover:shadow-md cursor-pointer"
        >
          <div class="flex items-center space-x-3 mb-2">
            <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M6 2h7a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"/>
            </svg>
            <div>
              <h4 class="font-semibold truncate max-w-xs">{{ doc.name }}</h4>
              <p class="text-xs text-gray-500">{{ doc.modified | formatDate }}</p>
            </div>
          </div>
          <div class="flex justify-between text-sm text-gray-400">
            <button @click="previewDoc(doc)" class="hover:text-blue-600">Preview</button>
            <button @click="downloadDoc(doc)" class="hover:text-green-600">Download</button>
            <button class="hover:text-red-600">Delete</button>
          </div>
        </div>
      </div>
    </main>

    <!-- PDF Preview Modal -->
    <div v-if="previewUrl" class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg w-full max-w-4xl h-[80vh] overflow-hidden flex flex-col">
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-lg font-semibold">Document Preview</h2>
          <button @click="previewUrl = null" class="text-red-500 hover:underline">Close</button>
        </div>
        <iframe :src="previewUrl" class="flex-1 w-full" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      documents: [
        { id: 1, name: "Project_Plan.pdf", modified: "2025-06-05" },
        { id: 2, name: "Meeting_Notes.docx", modified: "2025-06-01" },
        { id: 3, name: "Budget.xlsx", modified: "2025-05-28" },
      ],
      previewUrl: null,
    };
  },
  filters: {
    formatDate(value) {
      if (!value) return "";
      return new Date(value).toLocaleDateString();
    },
  },
  methods: {
    async previewDoc(doc) {
      try {
        // Simulate fetch PDF from API
        const response = await fetch(`/api/files/${doc.name}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        this.previewUrl = url;
      } catch (err) {
        console.error("Error previewing file:", err);
        alert("Failed to preview the document.");
      }
    },
    async downloadDoc(doc) {
      try {
        const response = await fetch(`/api/files/${doc.name}`);
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = doc.name;
        link.click();
      } catch (err) {
        console.error("Download error:", err);
      }
    },
  },
};
</script>

<style scoped>
main::-webkit-scrollbar {
  width: 8px;
}
main::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.3);
  border-radius: 4px;
}
</style>
