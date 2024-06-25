import axios from 'axios';
import { ACCESS_TOKEN,USERNAME } from "../@/utils/constants";
import { TaxData,Data } from '../@/utils/type';
const token=localStorage.getItem(ACCESS_TOKEN)
const name=localStorage.getItem(USERNAME)
export const api= axios.create({
    baseURL:"https://2dd4cf44-c179-4f22-b745-6dc772c05b3b-dev.e1-eu-north-azure.choreoapis.dev/deloittepy/backend/v1.0"
   
})

export const getTax = async () => {
    try {
        const response = await api.get('/api/taxes', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                username: name
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching taxes:', error);
        throw error;
    }
};

export const UpdateTax = async (data: TaxData)=> {
    try {
        const response = await api.put('/api/taxes', data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating tax:', error);
        throw error;
    }
};

export const AiGenerate=async(username:string)=>{
    try{
        const response=await api.post('/api/aiadvice',{username},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }); 
        return response.data;
    } catch (error) {
        console.error('Error updating tax:', error);
        throw error;
    }
    
}

export const Createuser=async(data:Data)=>{
    try{
        await api.post("/api/user/register/", data)
    }
    catch (error) {
        console.error('Error updating tax:', error);
        throw error;
    }
}

export const Signin=async(data:Data)=>{
    try{
        const response = await api.post("/api/token/", data)
        return response.data;
    }catch (error) {
        console.error('Error updating tax:', error);
        throw error;
    }
}


