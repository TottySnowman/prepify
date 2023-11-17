"use client";
import React from "react";
import { getSession } from "next-auth/react";
import { step_by_step_guide_response } from "../global_types/meal";
import Step from "./step";
import Image from "next/image";

type step_by_step_props = step_by_step_guide_response & {};
export default class Step_by_Step extends React.Component<
  {},
  step_by_step_props
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      title: "",
      ready_in_minutes: 0,
      display_image: "",
      ingredient_list: [],
      step: [],
    };
  }
  async componentDidMount() {
    const session = await getSession();
    if (!session?.user) {
      return;
    }
    const step_by_step_res = await fetch(`api/user/${session.user.id}/meal`);
    if (step_by_step_res.ok) {
      const step_by_step_json: step_by_step_guide_response =
        await step_by_step_res.json();
      this.setState({
        title: step_by_step_json.title,
        ready_in_minutes: step_by_step_json.ready_in_minutes,
        display_image: step_by_step_json.display_image,
        ingredient_list: step_by_step_json.ingredient_list,
        step: step_by_step_json.step,
      });
    }

    /*  this.setState({
      title: "Salmon Amaranth Burgers with Radish Slaw",
      ready_in_minutes: 26,
      display_image: "https://spoonacular.com/recipeImages/1095894-556x370.jpg",
      step: [
        {
          number: 1,
          step: "If you are using frozen salmon filets leave them in a strainer to get rid of excess water and squeeze any remaining water out.Chop up the fish roughly and pulse in a blender to obtain a smooth mixture.  Season, add the amaranth, horseradish, breadcrumbs and stir well.  Fold in the capers.  Form thick (about 2 cm) burgers and coat in the remaining breadcrumbs.",
          ingredients: [
            {
              id: 10115076,
              name: "salmon fillets",
              localizedName: "salmon fillets",
              image: "salmon.png",
            },
            {
              id: 18079,
              name: "breadcrumbs",
              localizedName: "breadcrumbs",
              image: "breadcrumbs.jpg",
            },
            {
              id: 1002055,
              name: "horseradish",
              localizedName: "horseradish",
              image: "horseradish.jpg",
            },
            {
              id: 20001,
              name: "amaranth",
              localizedName: "amaranth",
              image: "amaranth.jpg",
            },
            {
              id: 2054,
              name: "capers",
              localizedName: "capers",
              image: "capers.jpg",
            },
            {
              id: 14412,
              name: "water",
              localizedName: "water",
              image: "water.png",
            },
            {
              id: 10115261,
              name: "fish",
              localizedName: "fish",
              image: "fish-fillet.jpg",
            },
          ],
          equipment: [
            {
              id: 405600,
              name: "sieve",
              localizedName: "sieve",
              image: "strainer.png",
            },
            {
              id: 404726,
              name: "blender",
              localizedName: "blender",
              image: "blender.png",
            },
          ],
        },
        {
          number: 2,
          step: "Heat up about 2 tablespoons of oil and fry the burgers for 3 minutes on each side on a low/medium heat.To make the radish slaw, grate, spiralize or finely slice the radishes, add the dill, lemon juice, oil and seasoning, and stir well to combine.",
          ingredients: [
            {
              id: 9152,
              name: "lemon juice",
              image: "lemon-juice.jpg",
            },
            {
              id: 1042027,
              name: "seasoning",
              image: "seasoning.png",
            },
            {
              id: 11429,
              name: "radish",
              image: "radishes.jpg",
            },
            {
              id: 2045,
              name: "dill",
              image: "dill.jpg",
            },
            {
              id: 4582,
              name: "cooking oil",
              image: "vegetable-oil.jpg",
            },
          ],
          equipment: [],
          length: {
            number: 3,
            unit: "minutes",
          },
        },
        {
          number: 3,
          step: "Serve the burgers with the radish slaw in your favorite burger buns.",
          ingredients: [
            {
              id: 18350,
              name: "hamburger bun",

              image: "hamburger-bun.jpg",
            },
            {
              id: 11429,
              name: "radish",
              image: "radishes.jpg",
            },
          ],
          equipment: [],
        },
      ],
      ingredient_list: [
        {
          id: 10115076,
          name: "salmon filet",
          measure: {
            amount: 416.66666666666663,
            unitLong: "grams",
          },
        },
        {
          id: 20002,
          name: "amaranth",
          measure: {
            amount: 205,
            unitLong: "grams",
          },
        },
        {
          id: 2055,
          name: "horseradish sauce",
          measure: {
            amount: 0.8333333333333333,
            unitLong: "Tbsp",
          },
        },
        {
          id: 2054,
          name: "capers",
          measure: {
            amount: 2.5,
            unitLong: "Tbsps",
          },
        },
        {
          id: 18079,
          name: "breadcrumbs",
          measure: {
            amount: 1.6666666666666665,
            unitLong: "Tbsps",
          },
        },
        {
          id: 1012047,
          name: "sea salt",
          measure: {
            amount: 0.625,
            unitLong: "teaspoons",
          },
        },
        {
          id: 4053,
          name: "olive oil",
          measure: {
            amount: 1.6666666666666665,
            unitLong: "Tbsps",
          },
        },
        {
          id: 11429,
          name: "radish",
          measure: {
            amount: 208.33333333333331,
            unitLong: "grams",
          },
        },
        {
          id: 2045,
          name: "dill",
          measure: {
            amount: 0.8333333333333333,
            unitLong: "Tbsp",
          },
        },
        {
          id: 9152,
          name: "lemon juice",
          measure: {
            amount: 1.6666666666666665,
            unitLong: "Tbsps",
          },
        },
        {
          id: 18350,
          name: "burger buns",
          measure: {
            amount: 5,
            unitLong: "",
          },
        },
      ],
    }); */
  }
  render() {
    return (
      <div className="container mx-auto flex-grow">
        <div className="text-center p-4">
          <span className="prose">
            <h2 className="mb-2 text-3xl">
              This weeks recipe is: {this.state.title}
            </h2>
          </span>

          <span className="flex justify-center">
            <Image
              alt="Meal Preview"
              src={this.state.display_image}
              width={400}
              height={400}
              className="rounded-lg"
            ></Image>
          </span>
        </div>
        <h3 className="text-xl">Instructions</h3>
        <div className="flex flex-col">
          {this.state.step.map((singleStep) => (
            <Step
              number={singleStep.number}
              step={singleStep.step}
              ingredients={singleStep.ingredients}
              equipment={singleStep.equipment}
              length={singleStep.length}
            />
          ))}
        </div>
      </div>
    );
  }
}
