/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import EditTask from "./EditTax"
import { useEffect, useState } from "react"
import { useToast } from "./ui/use-toast"
import { getTax } from "@/apis/axios"

export function DialogDemo() {
    const { toast } = useToast()
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getTax();
                setUser(userData);

            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.response?.data?.detail || "Please try again.",
                });

            }
        };

        fetchUser();
    }, []);

    return (
        <Dialog  >
            <DialogTrigger asChild>
                <Button variant="destructive" className="sm:text-xl lg:text-2xl text-lg">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when  done.
                    </DialogDescription>
                </DialogHeader>


                <EditTask user={user} />

            </DialogContent>
        </Dialog>
    )
}
