/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useState } from "react"
import { toast } from "./ui/use-toast"


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
    conf: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
}).refine((data) => data.password === data.conf, {
    message: "Passwords don't match",
    path: ["conf"], // The path where the error message should be displayed
})
interface Props {
    setsubmit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Signupform({ setsubmit }: Props) {
    const [load, setload] = useState<boolean>(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            conf: ""
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
            await api.post("/api/user/register/", data)
            setsubmit(false)
            form.reset()

        } catch (err: any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: err.response?.data?.username || "Username already exist",
            });
            console.log(err)
        } finally {
            setload(false)
        }
    }
    return (
        <div className="border-2 border-primary rounded-2xl text-center p-5 sm:w-1/4 w-full">
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
                                    <Input placeholder="Password" {...field} type="password" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="conf"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Config password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Config password" type="password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="flex w-full items-center gap-4">Sign-Up <AiOutlineLoading3Quarters
                        className={load ? "animate-spin" : "hidden"}
                    /></Button>
                </form>
            </Form>
        </div>
    )
}
