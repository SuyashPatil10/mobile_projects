import { CATEGORIES, MEALS } from "../data/dummy-data"
import { useLayoutEffect } from "react";

import MealsList from "../components/MealsList";

function MealsOverviewScreen({ route, navigation }) {
    const { categoryId } = route.params;

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(categoryId) >= 0;
    });

    useLayoutEffect(() => {
        const categotyTitle = CATEGORIES.find((category) => category.id === categoryId).title;

        navigation.setOptions({
            title: categotyTitle
        });
    }, [categoryId, navigation]);

    return (
        <MealsList items={displayedMeals} isFavouriteList={false} />
    );   
}

export default MealsOverviewScreen;
