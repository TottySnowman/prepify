"use client";
import {
  meal_ingredient,
  spoon_meal_ingredient,
  meal_step,
} from "@/app/global_types/meal";
import Image from "next/image";

export default function Step(meal_step: meal_step) {
  return (
    <div>
      <h2>Step Number: {meal_step.number}</h2>
      <h3>Ingredients needed for this step</h3>
      {meal_step.ingredients ? (
        <div className="grid grid-cols-5">
          {meal_step.ingredients.map((ingredient) => (
            <div>
              <span className="w-1/2">{ingredient.name}</span>
              <span className="w-1/2">
                {/* <Image
                  src={ingredient.image}
                  alt="Picture of {ingredient.name}"
                  width={200}
                  height={200}
                ></Image> */}
              </span>
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
