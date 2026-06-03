'use server';

import {saveMeal} from "./meals";
import {redirect} from "next/navigation";

function isInvalid(text: FormDataEntryValue) {
    return !text || typeof text !== 'string' || text.trim() === '';
}

export async function shareMeal(prevState, formData: FormData) {
    'use server'

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }

    if (
        isInvalid(meal.title) ||
        isInvalid(meal.summary) ||
        isInvalid(meal.instructions) ||
        isInvalid(meal.creator) ||
        isInvalid(meal.creator_email) ||
        (typeof meal.creator_email === 'string' && !meal.creator_email.includes('@')) ||
        !meal.image ||
        (typeof meal.image === 'object' && meal.image.size === 0)
    ) {
        return {
            message: 'Invalid input data'
        }
    }
    await saveMeal(meal);
    redirect('/meals');
}