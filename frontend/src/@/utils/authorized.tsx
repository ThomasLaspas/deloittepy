import { jwtDecode } from "jwt-decode";
import { api } from "../../apis/axios";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./constants";
import { useState, useEffect } from "react";


function IsAuth() {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                const decoded = jwtDecode(refreshToken!);
                const tokenExpiration = decoded.exp;
                const now = Date.now() / 1000;
                console.log(tokenExpiration)
                if (tokenExpiration! < now) {
                    localStorage.clear()
                    setIsAuthorized(false)
                    return
                } else {
                    localStorage.setItem(ACCESS_TOKEN, res.data.access)
                    setIsAuthorized(true)
                    return tokenExpiration
                }

            } else {
                setIsAuthorized(false)
                localStorage.clear()
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration! < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };


    return isAuthorized;
}

export default IsAuth
