import { defineStore } from 'pinia';
import axios from '../axios';


export const UseDocumentStore = defineStore('DocumentStore', {
  state: () => ({
    uploadedFileId: null,
    previewBlobUrl: null,
    data: [], 
  }),

getters: {
    getData: (state) => state.data,

},


  actions: {
    async upload({ fileName, file }) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName); // if your backend expects it

      const res = await fileService.uploadFile(formData);
      this.uploadedFileId = res.data.fileId;
    },

   async fetchDocuments(token){     
              axios.GetFiles(token)
                .then(response => {
                    this.data = response.data;
                    this.loading = false;
                })
                .catch(error => {
                    this.error=error;
                    this.loading = false;
                });
            },


    async preview(fileId) {
      const res = await fileService.getFilePreview(fileId);
      const blob = new Blob([res.data], { type: 'application/pdf' });
      this.previewBlobUrl = URL.createObjectURL(blob);
    },

    //GetFiles

 async download(fileId) {
  const res = await fileService.downloadFile(fileId);
  const blob = new Blob([res.data], { type: res.headers['content-type'] });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  
  const disposition = res.headers['content-disposition'];
  const filename = disposition?.match(/filename="?(.+)"?/)?.[1] || 'downloaded_file';
  
  link.download = filename;
  link.click();
}

  },
});
