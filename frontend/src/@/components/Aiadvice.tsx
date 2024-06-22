/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import { aiGenerate } from '../../apis/axios'
import { TextGenerateEffect } from './ui/text-generate-effect'
import { USERNAME } from '../utils/constants'

function Aiadvice() {
    const { toast } = useToast()
    const [advice, setAdvice] = useState<string | null>(null)
    const [load, setload] = useState<boolean>(false)
    const username = localStorage.getItem(USERNAME)

    const aitax = async () => {
        setload(true)
        try {
            const generatedAdvice = await aiGenerate(username!);
            setAdvice(generatedAdvice.advice);
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.response?.data?.detail || "Please try again.",
            });
        } finally {
            setload(false)
        }
    };
    return (
        <div className='w-full text-center grid place-items-center gap-7 sm:pb-0 pb-5'>
            <Button className="sm:text-xl lg:text-2xl text-lg" onClick={aitax} disabled={load}>tax advice</Button>
            {advice ? (
                <div className="sm:w-4/6 w-full p-6 rounded-3xl gap-x-6 bg-primary text-black border-black text-justify overflow-auto">
                    <TextGenerateEffect className="text-center" words={advice} />
                </div>
            ) : (
                load ? (
                    <section className="w-full h-[60vh] grid place-items-center">
                        <div className="loader"></div>
                    </section>
                ) : null
            )}
        </div>
    )
}

export default Aiadvice