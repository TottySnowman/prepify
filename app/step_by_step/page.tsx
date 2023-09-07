"use client";
import React from "react";
import { getSession } from "next-auth/react";
import { step_by_step_guide_response } from "@/global_types/meal";
import step from "../step";

type step_by_step_props = {
  name: string;
};
export default class Step_by_Step extends React.Component<step_by_step_props> {
  constructor(props: step_by_step_props) {
    super(props);
    this.state = {
      step_by_step_guide_response: step_by_step_guide_response,
    };
  }
  componentDidMount() {
    const session = await getSession();
    if (!session?.user) {
      return;
    }
    const step_by_step_res = await fetch(`api/user/${session.user.id}/meal`);
    if (step_by_step_res.ok) {
      const step_by_step_json: step_by_step_guide_response =
        await step_by_step_guide_response.json();
      this.state.step_by_step_guide_response = step_by_step_json;
    }
  }
  render() {
    return (
      <div>
        <h1>Here is the step by step guide for your recipe!</h1>
        {this.state.step_by_step_guide_response.step.map((singleStep) => (
          <Step meal_step={singleStep} />
        ))}
      </div>
    );
  }
}
