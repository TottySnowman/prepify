"use client";
import React from "react";
import { getSession } from "next-auth/react";
import { step_by_step_guide_response } from "../global_types/meal";
import Step from "./step";

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
  }
  render() {
    return (
      <div>
        <h1>Here is the step by step guide for your recipe!</h1>
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
    );
  }
}
