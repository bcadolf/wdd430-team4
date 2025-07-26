import { JSX } from "react";

export interface NavLink {
    label: string;
    href: string;
}

export interface SocialLink {
    label: string;
    href: string;
    icon: JSX.Element;
}