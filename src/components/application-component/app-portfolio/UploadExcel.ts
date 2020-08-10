import axios from 'axios';
import { bus } from '../../../main';
import { Component, Inject, Vue } from 'vue-property-decorator';

@Component
export default class UploadExcel extends Vue {
  file: any = {};
  file1: any = {};
  templates: any = {};
  company_id = 0;
  $refs!: {
    file: HTMLFormElement,
    file1: HTMLFormElement
  }
  public created() {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = parseInt(obj);
    });
    if (this.company_id === 0 || this.company_id === NaN) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      console.log(this.company_id);
    }
  }
  public mounted() {
    this.dowloadTemplate();
  }
  uploadAppView() {
    /*
            Initialize the form data
        */
    const formData = new FormData();

    /*
        Add the form data we need to submit
    */

    formData.append('file', this.file);
    /*
      Make the request to the POST /single-file URL
    */
    axios
      .post('api/upload-excels/appView/'+this.company_id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function() {
        console.log('SUCCESS!!');
        alert('Successfully uploaded');
        bus.$emit('excelUploaded', true);
      })
      .catch(function() {
        console.log('FAILURE!!');
        alert('failed to upload');
      });
    this.reset();
  }

  uploadFunctionalView() {
    /*
            Initialize the form data
        */

    const formData = new FormData();

    /*
        Add the form data we need to submit
    */
    formData.append('file', this.file1);

    /*
      Make the request to the POST /single-file URL
    */
    axios
      .post('api/upload-excels/functionalView/'+this.company_id , formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function() {
        console.log('SUCCESS!!');
        alert('Successfully uploaded');
        bus.$emit('excelUploaded', true);
      })
      .catch(function() {
        console.log('FAILURE!!');
        alert('failed to upload');
      });
    this.reset();
  }

  dowloadTemplate() {
    console.log('template');
    axios.get('api/excel-templates').then(res => {
      this.templates = res.data;
      console.log(this.templates);
    }).catch(function(error) {
      console.log(error);
    })
  }

  openFile(contentType: any, data: any) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // To support IE and Edge
      const byteCharacters = atob(data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: contentType
      });
      window.navigator.msSaveOrOpenBlob(blob);
    } else {
      // Other browsers
      const fileURL = `data:${contentType};base64,${data}`;
      const win = window.open();
      win?.document.write(
        '<iframe src="' +
          fileURL +
          '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
      );
    }
  }
  /*
    Handles a change on the file upload
  */
  handleFileUpload() {
    this.file = this.$refs.file.files[0];
  }
  handleFile1Upload() {
    this.file1 = this.$refs.file1.files[0];
  }

  reset() {
    const input = this.$refs.file;
    input.type = 'text';
    input.type = 'file';
  }
}
