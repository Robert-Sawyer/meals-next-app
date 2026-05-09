import classes from './MealsGrid.module.css'
import MealItem from "./MealItem";

type MealsGridProps = {
    meals: Array<{
        id: number;
        title: string;
        image: string;
        slug: unknown;
        summary: string;
        creator: string;
    }>
}

export default function MealsGrid({meals}: MealsGridProps) {
    return <ul>
        {meals.map(meal => (
            <li key={meal.id}>
                <MealItem {...meal} />
            </li>
        ))}
    </ul>
}