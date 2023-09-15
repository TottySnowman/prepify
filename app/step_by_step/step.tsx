"use client";
import {
  meal_ingredient,
  spoon_meal_ingredient,
  meal_step,
} from "@/app/global_types/meal";
import Image from "next/image";

export default function Step(meal_step: meal_step) {
  return (
    <div className="mb-4 border border-solid border-slate-400 bg-gray-500 p-2 rounded-lg prose-4">
      <h2 className="bg-green-600 text-lg border-solid p-3 rounded-full inline-block">
        {meal_step.number}
      </h2>

      <h3 className="text-xl">Ingredients needed for this step</h3>
      {meal_step.ingredients ? (
        <div className="grid grid-cols-12">
          {meal_step.ingredients.map((ingredient) => (
            <div>
              <span className="w-1/2">{ingredient.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <span>No ingredients needed for this step!</span>
      )}
      <p>Detailed description: {meal_step.step}</p>
      {meal_step.length ? (
        <p>
          This step takes {meal_step.length.number} {meal_step.length.unit}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}
