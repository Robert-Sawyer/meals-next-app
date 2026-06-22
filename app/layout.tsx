import './globals.css';
import MainHeader from "../components/MainHeader/main-header";
import {Metadata} from "next";
import {JSX, ReactNode} from "react";

export const metadata: Metadata = {
    title: 'NextLevel Food',
    description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body>
                <MainHeader/>
                {children}
            </body>
        </html>
    );
}
