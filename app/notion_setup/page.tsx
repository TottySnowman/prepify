import { step_by_step_guide_response } from "../global_types/meal";
import Image from "next/Image";
export default class Notion_setup extends React.Component<
  {},
  step_by_step_props
> {
  render() {
    return (
      <>
        <div className="prose flex flex-col justify-center">
          <h1>Setup Notion secret</h1>

          <h2>Why should you setup a Notion connection?</h2>
          <div>
            <p>
              By adding your Notion connection you will get your ingredients
              including the needed measurements for the week. So you don't need
              to plan the ingredients for the recipe.
            </p>
          </div>

          <h2>How to setup Notion?</h2>
          <div>
            <p>
              To setup Notion you first need to head to your notion integrations
            </p>
            <a href="https://www.notion.so/my-integrations">My Integrations</a>

            <p>Press on New Integration</p>
            <Image src={""} width={} height={} alt="New Integration Button" />
            <p>Select your desired Workspace and a fitting name</p>
            <p>
              And you can also upload a logo if you want. The Prepify Logo can
              be found here:
            </p>
            <a>Link zum Prepify Logo Download</a>

            <p>Click on Send</p>
            <Image alt="Image of send button"></Image>

            <p>Check the Security Tab and enable following features:</p>
            <Image alt="Image of Zugriffsrechte"></Image>
            <p>Go to Secret Tab and copy the secret</p>

            <p>
              Now go to the Page where you want the Shoppinglist to be saved
            </p>
            <p>
              Press the three dots on top and go to connections Add Connection
              Select your created Integration
            </p>

            <p>Now go to your Profile</p>
            <a>Link to your Profile</a>

            <p>Go to general settings</p>
            <p>Add your Secret in the textbox and press save settings</p>

            <p>
              Now Notion should be setup! You can try it by pressing the button
              over here or wait till friday!
            </p>

            <button>Press to add the ingredients to your shoppinglist!</button>
          </div>
        </div>
      </>
    );
  }
}
