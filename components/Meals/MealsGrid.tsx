import classes from './MealsGrid.module.css'
import MealItem from "./MealItem";
import {ReactElement} from "react";
import {Meal} from "../../lib/meals";

type MealsGridProps = {
    meals: Meal[];
}

export default function MealsGrid({meals}: MealsGridProps): ReactElement {
    return <ul className={classes.meals}>
        {meals.map(meal => (
            <li key={meal.id}>
                <MealItem {...meal} />
            </li>
        ))}
    </ul>
}
