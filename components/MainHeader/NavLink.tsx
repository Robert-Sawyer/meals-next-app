'use client';

import {ReactElement, ReactNode} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import classes from './NavLink.module.css';

type NavLinkProps = {
    href: string,
    children: ReactNode
}

export default function NavLink({href, children}: NavLinkProps): ReactElement {
    const path = usePathname();

    return (
        <Link
            href={href}
            className={path.startsWith(href) ? `${classes.active} ${classes.link}` : classes.link}
        >
            {children}
        </Link>
    )
}
