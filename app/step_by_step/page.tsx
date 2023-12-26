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
    const step_by_step_res = await fetch(`api/user/meal`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session.user.accessToken}`,
      },
    });
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
              key={singleStep.number}
            />
          ))}
        </div>
      </div>
    );
  }
}
