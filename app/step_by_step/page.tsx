"use client";

import React from "react";
type step_by_step_props = {
  name: string;
};
export default class Step_by_Step extends React.Component<step_by_step_props> {
  constructor(props: step_by_step_props) {
    super(props);
  }

  render() {
    return <h1>Here is the step by step guide for your recipe!</h1>;
  }
}
