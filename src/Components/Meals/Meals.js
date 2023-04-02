import { Fragment } from "react";
import AvailabelMeals from "./AvailabelMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
    return <Fragment>
        <MealsSummary />
        <AvailabelMeals />
    </Fragment>
}
export default Meals;