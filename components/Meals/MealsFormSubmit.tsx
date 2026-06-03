'use client';

import {useFormStatus} from "react-dom";

export function MealsFormSubmit() {
    const {pending} = useFormStatus()

    return <button type="submit" disabled={pending}>{pending ? 'Submitting...': 'Share Meal'}</button>
}