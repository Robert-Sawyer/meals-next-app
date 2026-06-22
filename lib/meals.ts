import { S3 } from '@aws-sdk/client-s3';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

export type Meal = {
    id: number;
    slug: string;
    title: string;
    image: string;
    summary: string;
    instructions: string;
    creator: string;
    creator_email: string;
};

export type MealFormInput = {
    title: string;
    summary: string;
    instructions: string;
    image: File;
    creator: string;
    creator_email: string;
};

type MealInsert = Omit<Meal, 'id'>;

const s3 = new S3({
    region: process.env.AWS_REGION,
});

const db = sql('meals.db');

export async function getMeals(): Promise<Meal[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM meals').all() as Meal[];
}

export function getMeal(slug: string): Meal | undefined {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as Meal | undefined;
}

export async function saveMeal(meal: MealFormInput): Promise<void> {
    const slug = slugify(meal.title, {lower: true});
    const instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${slug}.${extension}`;

    const bufferedImage = await meal.image.arrayBuffer();

    await s3.putObject({
        Bucket: 'rob-sawyer-nextjs-demo-users-image',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
    });

    const mealInsert: MealInsert = {
        ...meal,
        slug,
        instructions,
        image: fileName,
    };

    db.prepare(`
        INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
                   @title,
                   @summary,
                   @instructions,
                   @creator,
                   @creator_email,
                   @image,
                   @slug
               )
    `).run(mealInsert);
}
