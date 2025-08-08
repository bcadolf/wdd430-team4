import styles from './page.module.css';
import LandingSkeleton from '../ui/skeletons';
import React, { useState, FormEvent } from 'react'

export default function Login() {

    interface LoginFormData {
        email: string;
        password: string;
    }
    
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<Partial<LoginFormData>>({});

    const [isLoading,setIsLoading] = useState(false);
    
}