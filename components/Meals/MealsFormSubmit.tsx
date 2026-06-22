'use client';

import {useFormStatus} from "react-dom";
import {ReactElement} from "react";

export function MealsFormSubmit(): ReactElement {
    const {pending} = useFormStatus()

    return <button type="submit" disabled={pending}>{pending ? 'Submitting...': 'Share Meal'}</button>
}
