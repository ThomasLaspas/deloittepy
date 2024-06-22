import axios from 'axios';
import { ACCESS_TOKEN,REFRESH_TOKEN,USERNAME } from "../@/utils/constants";
import { TaxData } from '../@/utils/type';
export const api= axios.create({
    baseURL:"http://127.0.0.1:8000"
   
})
const token=localStorage.getItem(ACCESS_TOKEN)
const refresh=localStorage.getItem(REFRESH_TOKEN)
const name=localStorage.getItem(USERNAME)
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

export const updateTax = async (data: TaxData): Promise<TaxData> => {
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

export const aiGenerate=async(username:string)=>{
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

export const LogoutUser=async()=>{
    try {
        await api.post('/api/user/logout/', { refresh_token: refresh},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        );
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(USERNAME);

      } catch (error) {
        console.error('Error logging out:', error);
      }
}