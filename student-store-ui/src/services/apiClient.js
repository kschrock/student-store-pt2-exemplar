import axios from "axios";

class ApiClient {
    constructor(remoteHostURL){
      this.remoteHostURL = remoteHostURL  
      this.token = null
      this.tokenName = "student_store_token"
    }

    setToken(token){
        this.token = token
        localStorage.setItem(this.tokenName, token)
    }

    async request({ endpoint, method = `GET`, data = {} }) {
        const url = `${this.remoteHostURL}/${endpoint}`

        const headers = {
           "Content-Type": "application/json" 
        }

        if(this.token){
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const res = await axios({ url, method, data, headers })
            return {data: res.data, error:null}
        } catch (error) {
            console.log({errorResponse: error.response})
            const message = error?.response?.data?.error?.message
            return {data: null, error: message || String(error)}
        }
    }


    async loginUser(credentials){
        return await this.request({ endpoint: `auth/login`, method: `POST`, data : credentials})
    }

    async singupUser(credentials){
        return await this.request({ endpoint: `auth/register`, method: `POST`, data : credentials})
    }

    async usercreateOrder(cart){
        return await this.request({ endpoint: `orders/`, method: `POST`, data : cart})
    }

    async fetchUserFromToken(){
        return await this.request({ endpoint: `auth/me`, method: `GET`})
    }

    async logoutUser(){
        this.setToken(null)
        localStorage.getItem(this.tokenName, "")
    }

    async getProducts(){
        return await this.request({ endpoint: `store/`, method: `GET`})
    }
}

export default new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001")