<script>
const API = "http://localhost:3000/api/";



export default {
    name: 'APICall',
    methods: {

        setToken: function (token) {
            sessionStorage.setItem('jwt', token);
        },

        getToken: function () {
            return sessionStorage.getItem('jwt');
        },

        getParsedToken: function () {
            const token = sessionStorage.getItem('jwt');
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        },

        removeToken: function () {
            sessionStorage.removeItem('jwt');
        },


        isSetToken: function () {
            return sessionStorage.getItem('jwt') != null;
        },

        getUrl: function (route) {
            return `${API}${route}`;
        },

        getHeader: function () {
            if (sessionStorage.getItem('jwt')) {
                return {"Content-Type" : "application/json", "Authorization" : `Bearer ${sessionStorage.getItem('jwt')}`};
            }
            return {"Content-Type" : "application/json"};
        },

        post: async function(route, request) {
            let options = {
                method: "POST",
                body: JSON.stringify(request),
                headers: this.getHeader()
            };
            let url = `${API}${route}`;

            const response = await fetch(url,options);
            return await response.json();
        },

        postFile: async function(route, formData) {
            let options = {
                method: "POST",
                body: formData,
                headers: {"Authorization" : `Bearer ${sessionStorage.getItem('jwt')}`}
            };
            let url = `${API}${route}`;

            const response = await fetch(url,options);
            return await response.json();
        },

        put: async function(route, request) {
            let options = {
                method: "PUT",
                body: JSON.stringify(request),
                headers: this.getHeader()
            };
            let url = `${API}${route}`;

            const response = await fetch(url, options);
            return await response.json();
        },

        get: async function(route) {
            let options = {
                method: "GET",
                headers: this.getHeader()
            }
            let url = `${API}${route}`;
            
            const response = await fetch(url, options);
            return await response.json();
        },

        delete: async function(route) {
            let options = {
                method: "DELETE",
                headers: this.getHeader()
            }
            let url = `${API}${route}`;

            const response = await fetch(url, options);
            return await response.json();
        }    
    }
}

</script>