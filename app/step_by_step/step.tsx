"use client";
import { meal_step } from "@/app/global_types/meal";

export default function Step(meal_step: meal_step) {
  return (
    <div className="mb-4 border border-solid border-slate-400 bg-gray-500 p-2 rounded-lg prose-4">
      <h2 className="text-lg border border-solid p-3 rounded-full inline-block bg-primary">
        <span style={{ color: "black" }}>{meal_step.number}</span>
      </h2>

      {meal_step.ingredients ? (
        <>
          <h3 className="text-xl">Ingredients needed for this step:</h3>
          <div className="flex flex-wrap">
            {meal_step.ingredients.map((ingredient, index) => (
              <div key={index} className="w-1/2 flex items-center mb-2">
                <span className="inline-block w-4 h-4 bg-black rounded-full mr-2"></span>
                <span>{ingredient.name}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h3 className="text-xl">No ingredients needed for this step!</h3>
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
