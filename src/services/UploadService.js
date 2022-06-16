import apiClient from "./AxiosClient";
export default {
    uploadFile(file) {
        let formData = new FormData()
        formData.append('file', file)
        return apiClient.post('/uploadFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}