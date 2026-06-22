import classes from './page.module.css'
import Image from "next/image";
import {getMeal} from "../../../lib/meals";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import {ReactElement} from "react";

type MealDetailsPageProps = {
    params: Promise<{
        mealSlug: string;
    }>;
};

export async function generateMetadata({ params }: MealDetailsPageProps): Promise<Metadata> {
    const {mealSlug} = await params;
    const meal = getMeal(mealSlug);

    if (!meal) {
        notFound();
    }

    return {
        title: meal.title,
        description: meal.summary,
    }
}

export default async function MealDetailsPage({params}: MealDetailsPageProps): Promise<ReactElement> {
    const {mealSlug} = await params;
    const meal = getMeal(mealSlug)

    if (!meal) {
        notFound();
    }
    meal.instructions = meal.instructions.replace(/\n/g, '<br/>');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image
                        src={`https://rob-sawyer-nextjs-demo-users-image.s3.eu-north-1.amazonaws.com/${meal.image}`}
                        alt={meal.title}
                        fill
                    />
                </div>

                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>

                    <p className={classes.summary}>
                        {meal.summary}
                    </p>
                </div>
            </header>

            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions
                }}>
                </p>
            </main>
            </>
    )
}
