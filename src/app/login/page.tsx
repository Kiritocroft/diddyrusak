"use client";
import React, { useState } from "react";
import { login } from "@/app/action/auth";

const Page = () => {
    const[error,setError]=useState<any>(null)
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const form=new FormData(e.currentTarget)
        try {
            await login(form)
        } catch (error:any) {
            setError(error.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl mb-2">LOGIN</h1>
            <form className="flex flex-col gap-4">
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    required
                    className="border p-2 rounded-lg"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    required
                    className="border p-2 rounded-lg"
                />
                <button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-600 text-white p-2"
                >
                    LOGIN
                </button>
            </form>
        </div>
    );
};

export default Page;
