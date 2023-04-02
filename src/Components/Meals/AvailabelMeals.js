import classes from './AvailabelMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const AvailabelMeals = () => {
    const [meal, setMeal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://food-ec8a5-default-rtdb.firebaseio.com/meals.json');
            if (!response.ok) {
                throw new Error('Somthing went Wrong.....!')
            }
            const responseData = await response.json();

            const loadedMeal = [];
            for (const key in responseData) {
                loadedMeal.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }

            setMeal(loadedMeal);
            setLoading(false);
        }
        fetchMeals().catch((error) => {
            setLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (httpError) {
        return <section className={classes.mealsError}>
            <h2>{httpError}</h2>
        </section>
    }

    if (loading) {
        return <section className={classes.mealsLoading}>
            <p>Loading......</p>
        </section>
    }


    const mealsList = meal.map(meal =>
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    );
    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
}

export default AvailabelMeals;