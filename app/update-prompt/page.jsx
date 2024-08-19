'use client';
import { Suspense } from "react";
import UpdatePrompt from "./page2";



const page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdatePrompt />
        </Suspense>
    );
};

export default page;