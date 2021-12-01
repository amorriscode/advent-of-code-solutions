import input from './input'

export const inputParser = (input) =>
  input
    .split('\n')
    .map((line) => line.replace(')', '').split(' (contains '))
    .map(([ingredients, allergens]) => ({
      ingredients: ingredients.split(' '),
      allergens: allergens.split(', '),
    }))

const data = inputParser(input)

const getIngredients = (foods) => {
  let allIngredients = new Map()
  const allAllergens = new Set()

  foods.forEach((food) => {
    food.ingredients.forEach((ingredient) => {
      const ingredientData = allIngredients.get(ingredient)
      if (ingredientData) {
        ingredientData.count++
      } else {
        allIngredients.set(ingredient, {
          count: 1,
          mightContain: new Set(),
          name: ingredient,
        })
      }
    })

    food.allergens.forEach((allergen) => allAllergens.add(allergen))
  })

  allIngredients = [...allIngredients.values()]

  allIngredients.forEach(
    (ingredient) => (ingredient.mightContain = new Set(allAllergens))
  )

  foods.forEach((food) => {
    allIngredients.forEach((ingredient) => {
      if (!food.ingredients.includes(ingredient.name)) {
        food.allergens.forEach((allergen) =>
          ingredient.mightContain.delete(allergen)
        )
      }
    })
  })

  return allIngredients
}

export const part1 = (foods = data) => {
  return getIngredients(foods)
    .filter((ingredient) => ingredient.mightContain.size === 0)
    .reduce((sum, { count }) => sum + count, 0)
}

export const part2 = (foods = data) => {
  const allIngredients = getIngredients(foods).filter(
    (ingredient) => ingredient.mightContain.size !== 0
  )

  let done
  while (done !== allIngredients.length) {
    done = 0

    allIngredients.forEach((ingredient) => {
      if (ingredient.contains) {
        done++
      } else if (ingredient.mightContain.size === 1) {
        ingredient.contains = [...ingredient.mightContain.values()].pop()
        allIngredients.forEach((secondIngredient) =>
          secondIngredient.mightContain.delete(ingredient.contains)
        )
      }
    })
  }

  return allIngredients
    .sort((a, b) => a.contains.localeCompare(b.contains))
    .map((ingredient) => ingredient.name)
    .join(',')
}

export default {
  part1,
  part2,
}
