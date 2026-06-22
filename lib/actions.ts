'use server';

import {saveMeal} from "./meals";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export type ShareMealState = {
    message: string | null;
};

function isValidText(text: FormDataEntryValue | null): text is string {
    return typeof text === 'string' && text.trim() !== '';
}

function isValidImage(image: FormDataEntryValue | null): image is File {
    return image instanceof File && image.size > 0;
}

export async function shareMeal(prevState: ShareMealState, formData: FormData): Promise<ShareMealState> {
    'use server'

    const title = formData.get('title');
    const summary = formData.get('summary');
    const instructions = formData.get('instructions');
    const image = formData.get('image');
    const creator = formData.get('name');
    const creatorEmail = formData.get('email');

    const emailIsInvalid = typeof creatorEmail !== 'string' || !creatorEmail.includes('@');

    if (
        !isValidText(title) ||
        !isValidText(summary) ||
        !isValidText(instructions) ||
        !isValidText(creator) ||
        !isValidText(creatorEmail) ||
        emailIsInvalid ||
        !isValidImage(image)
    ) {
        return {
            message: 'Invalid input data'
        }
    }

    await saveMeal({
        title,
        summary,
        instructions,
        image,
        creator,
        creator_email: creatorEmail,
    });

    revalidatePath('/meals')
    redirect('/meals');
}
