'use client'

import { useSearchParams, useRouter } from "next/navigation"
import React, { useState } from "react";
import { createSeller } from "@/lib/actions";

export default function CreateSellerForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        owner_first: '',
        owner_last: '',
        store_name: '',
        store_email: '',
        store_address: '',
        password: ''
    });

    const [sellerImage, setSellerImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSellerImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        // Basic validation
        if (formData.password.length < 8) {
            alert("Password must be at least 8 characters");
            return;
        }

        setLoading(true);

        try {
            // Create FormData for file upload
            const submitData = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                submitData.append(key, value);
            });
            

            if (sellerImage) {
                submitData.append('seller_image', sellerImage);
            } else {
                // Indicate to use default image
                submitData.append('use_default_image', 'true');
            }

            const result = await createSeller(submitData);
            
            if (result?.error) {
                console.error("Account creation error:", result.error);
                setError(result.error);
            } else {
                alert("Seller account has been created successfully!");
                // Reset form
                setFormData({
                    owner_first: '',
                    owner_last: '',
                    store_name: '',
                    store_email: '',
                    store_address: '',
                    password: ''
                });
                setSellerImage(null);
                // Redirect or handle success as needed
                window.location.href = "/sellers";
            }
        } catch (error) {
            console.error("Account creation error:", error);
            setError("Account creation failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "50vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0c2c47",
            borderRadius: "24px",
            padding: "10px"
        }}>

            <form onSubmit={handleSubmit} style={{
                background: "#e4f2ea",
                padding: "2rem",
                borderRadius: "24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                minWidth: 400,
                maxWidth: 600,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                color: "black",
            }}>

                <h1 style={{ textAlign: "center", marginBottom: "1rem", fontWeight: "bold", fontSize: "1.5rem" }}>Create Seller&apos;s Account</h1>

                <label htmlFor="owner_first" style={{ fontWeight: "bold" }}>
                    Owner&apos;s First Name
                </label>
                <input
                    id="owner_first"
                    type="text"
                    name="owner_first"
                    placeholder="Enter store owner's first name"
                    value={formData.owner_first}
                    onChange={handleInputChange}
                    disabled={loading}
                    style={{
                        border: "1px solid #e2a54d",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        background: "white"
                    }}
                    required
                />

                <label htmlFor="owner_last" style={{ fontWeight: "bold" }}>
                    Owner&apos;s Last Name
                </label>
                <input
                    id="owner_last"
                    type="text"
                    name="owner_last"
                    placeholder="Enter store owner's last name"
                    value={formData.owner_last}
                    onChange={handleInputChange}
                    disabled={loading}
                    style={{
                        border: "1px solid #e2a54d",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        background: "white"
                    }}
                    required
                />

                <label htmlFor="store_name" style={{ fontWeight: "bold" }}>
                    Store Name
                </label>
                <input
                    id="store_name"
                    type="text"
                    name="store_name"
                    placeholder="Enter store name"
                    value={formData.store_name}
                    onChange={handleInputChange}
                    disabled={loading}
                    style={{
                        border: "1px solid #e2a54d",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        background: "white"
                    }}
                    required
                />

                <label htmlFor="store_email" style={{ fontWeight: "bold" }}>
                    Store Email
                </label>
                <input
                    id="store_email"
                    type="email"
                    name="store_email"
                    placeholder="Enter store email"
                    value={formData.store_email}
                    onChange={handleInputChange}
                    disabled={loading}
                    style={{
                        border: "1px solid #e2a54d",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        background: "white"
                    }}
                    required
                />

                <label htmlFor="store_address" style={{ fontWeight: "bold" }}>
                    Store Address
                </label>
                <input
                    id="store_address"
                    type="text"
                    name="store_address"
                    placeholder="Enter store address"
                    value={formData.store_address}
                    onChange={handleInputChange}
                    disabled={loading}
                    style={{
                        border: "1px solid #e2a54d",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        background: "white"
                    }}
                    required
                />

                <label htmlFor="password" style={{ fontWeight: "bold" }}>
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Set account password (min 8 characters)"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={loading}
                    style={{
                        border: "1px solid #e2a54d",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        background: "white"
                    }}
                    required
                />

                <label htmlFor="seller_image" style={{ fontWeight: "bold" }}>
                    Upload Seller&apos;s Image (Optional)
                </label>
                <input
                    id="seller_image"
                    type="file"
                    name="seller_image"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={loading}
                    style={{
                        border: "1px solid #e2a54d",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        background: "white"
                    }}
                />
                <small style={{ color: "#666", fontSize: "0.9em", marginTop: "-0.5rem" }}>
                    If no image is uploaded, a default profile icon will be used.
                </small>

                <button 
                    className="bg-blue-950 text-white rounded px-5 py-3 font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                    type="submit" 
                    disabled={loading}
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>

                {error && <div style={{ color: "red" }}>{error}</div>}
            </form>
        </div>
    )
}
