import { step_by_step_guide_response } from "../global_types/meal";
export default class Notion_setup extends React.Component<
  {},
  step_by_step_props
> {
  render() {
    return (
      <>
        <div className="prose flex justify-center">
          <h1>Setup Notion secret</h1>
        </div>
      </>
    );
  }
}
