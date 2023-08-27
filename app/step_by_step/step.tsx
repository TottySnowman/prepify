"use client";
import {
  meal_ingredient,
  spoon_meal_ingredient,
  meal_step,
} from "@/app/global_types/meal";

export default function step(meal_step: meal_step) {
  return (
    <div>
      <h2>{meal_step.step}</h2>
    </div>
  );
}
