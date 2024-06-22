/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod"
import { Button } from "./ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { api } from "@/apis/axios"
import { REFRESH_TOKEN, ACCESS_TOKEN, USERNAME } from "../utils/constants"
import { useState } from "react";
import { toast } from "./ui/use-toast";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
})



export default function Signinform() {
    const [load, setload] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setload(true)
        const data = {
            username: values.username,
            password: values.password
        }
        try {
            const response = await api.post("/api/token/", data)
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            localStorage.setItem(USERNAME, values.username);
            console.log(response.data)
            form.reset()
            window.location.href = '/'

        } catch (err: any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: err.response?.data?.detail || "Please try again.",
            });

        } finally {
            setload(false)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" type="password" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={load}>Sign-In   <AiOutlineLoading3Quarters
                    className={load ? "animate-spin" : "hidden"}
                /></Button>
            </form>
        </Form>
    )
}
