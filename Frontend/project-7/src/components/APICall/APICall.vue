<script>

const API = "http://localhost:3000/api/"

export default {
    name: 'APICall',
    props: {
        msg: String
    },
    data: () => {
        return {
            jwt : ""
        }
    },
    methods: {

        setToken: function (token) {
            this.jwt = token;
        },

        getUrl: function (route) {
            return `${API}${route}`;
        },

        getHeader: function () {
            return {"Authorization" : `Bearer ${this.jwt}`};
        },

        post: async function(route, request) {
            let options = {
                method: "POST",
                body: JSON.stringify(request),
                headers: {
                    "Content-Type" : "application/json", "Authorization" : `Bearer ${this.jwt}`
                }
            };
            let url = `${API}${route}`;

            const response = await fetch(url,options);
            return await response.json();
        },

        put: async function(route, request) {
            let options = {
                method: "PUT",
                body: JSON.stringify(request),
                headers: {
                    "Content-Type" : "application/json", "Authorization" : `Bearer ${this.jwt}`
                }
            };
            let url = `${API}${route}`;

            const response = await fetch(url, options);
            return await response.json();
        },

        get: async function(route) {
            let options = {
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${this.jwt}`
                }
            }
            let url = `${API}${route}`;
            
            const response = await fetch(url, options);
            return await response.json();
        },

        delete: async function(route) {
            let options = {
                method: "DELETE",
                headers: {
                    "Authorization" : `Bearer ${this.jwt}`
                }
            }
            let url = `${API}${route}`;

            const response = await fetch(url, options);
            return await response.json();
        }    
    }
}

</script>