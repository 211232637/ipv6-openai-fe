import axios from 'axios'
// import eventBus from './eventBus';
import router from '../router'

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

axios.defaults.baseURL = import.meta.env.VITE_APP_URL + '/api/';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    config.headers.Accept = 'application/json'
    return config
})
axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    console.log(error, 'ERROR INTERCEPTORS', axios.defaults.headers.common['X-CSRF-TOKEN']);
    if (error.response.status === 401) {
        // eventBus.$emit('toast', 'error', `${error.response.data.message}`);
        router.push({ name: 'auth', params: {} });
    } else if (error.response.status === 422) {
        // eventBus.$emit('toast', 'warning', `Bad Request!  ${error.response.data.message}`);
    } else {
        // eventBus.$emit('toast', 'error', `${error.response.data.message}`);
        if (error.response.status === 419) {
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
    }
    return Promise.reject(error)
});

export default axios;