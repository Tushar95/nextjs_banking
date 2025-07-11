'use client'

import {z} from 'zod';

export const formSchema = (type: string) => z.object({
    // username: z.string().min(2, {
    //     message: 'UserName must be atleast 2 characters' 
    // }).max(50),
    firstName: (type === 'sign-in' ? z.string().optional() : z.string().min(3, {
        message: "Enter atleast 3 characters"
    })),
    lastName: (type === 'sign-in' ? z.string().optional() : z.string().min(3, {
        message: "Enter atleast 3 characters"
    })),
    address1: (type === 'sign-in' ? z.string().optional() : z.string().min(3, {
        message: "Enter atleast 3 characters"
    })),
    city: (type === 'sign-in' ? z.string().optional() : z.string().min(3, {
        message: "Enter atleast 3 characters"
    })),
    state: (type === 'sign-in' ? z.string().optional() : z.string().min(2, {
        message: "Enter atleast 3 characters"
    })),
    postalCode: (type === 'sign-in' ? z.string().optional() : z.string().min(3, {
        message: "Enter atleast 3 characters"
    })),
    dob: (type === 'sign-in' ? z.string().optional() : z.string().min(3, {
        message: "Enter atleast 3 characters"
    })),
    ssn: (type === 'sign-in' ? z.string().optional() : z.string().min(3, {
        message: "Enter atleast 3 characters"
    })),
    email: z.string().email("Invalid email"),
    password: z.string().nonempty().nonoptional(),
});