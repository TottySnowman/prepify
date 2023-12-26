"use client";
import React from "react";
import Image from "next/image";
export default class Notion_setup extends React.Component<{}> {
  constructor({}) {
    super({});
  }
  render() {
    return (
      <>
        <div className="flex flex-col justify-center items-center prose max-w-full">
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
          <div className="flex flex-col justify-center items-center prose max-w-full">
            <h3>Create an Integration</h3>
            <p>
              To setup Notion you first need to head to your notion{" "}
              <a href="https://www.notion.so/my-integrations">Integrations</a>
            </p>

            <p>Press on New Integration</p>
            <Image
              src={"/assets/images/NotionSetupPictures/newIntegration.png"}
              width={1000}
              height={1000}
              alt="New Integration Button"
              className="w-1/2"
            />
            <p>Select your desired Workspace and a fitting name</p>
            <p>And you can also upload a logo if you want.</p>

            <p>Click on Submit</p>
            <Image
              alt="Image of submit button"
              src={"/assets/images/NotionSetupPictures/integrationSubmit.png"}
              width={1000}
              height={1000}
              className="w-1/2"
            />
            <p>
              You will be redirected to the secret tab, copy your secret to your
              clipboard.
            </p>

            <h3>Capabilities Settings</h3>
            <p>Go to the Capabilities Tab and enable following features:</p>
            <Image
              alt="Image of Capabilities"
              src="/assets/images/NotionSetupPictures/capabilitiesSettings.png"
              width={1000}
              height={1000}
              className="w-1/2"
            ></Image>
            <h3>Setup Shoppinglist</h3>
            <p>
              In Notion go to the Page where you want the Shoppinglist to be
              saved or create a new one Called "Prepify Shoppinglist"
            </p>
            <p>
              Press the three dots on top and go to connections Add Connection
              Select your created Integration
            </p>
            <Image
              alt="Image of Shopping Page"
              src="/assets/images/NotionSetupPictures/setupShoppingList.png"
              width={1000}
              height={1000}
              className="w-1/2"
            />

            <p>And accept the access</p>
            <Image
              alt="Image of accepting the access"
              src="/assets/images/NotionSetupPictures/acceptAccess.png"
              width={1000}
              height={1000}
              className="w-1/2"
            />

            <h3>Set Secret in Prepify Profile</h3>

            <p>
              Now go to your{" "}
              <a href="/profile" target="_blank">
                Profile{" "}
              </a>
              in the general settings
            </p>

            <p>Add your Secret in the textbox and press save settings</p>
            <Image
              alt="Image to insert Secret"
              src="/assets/images/NotionSetupPictures/setSecret.png"
              width={1000}
              height={1000}
              className="w-1/2"
            />
            <p>Save your Profile settings!</p>
            <Image
              alt="Image to save profile settings"
              src="/assets/images/NotionSetupPictures/saveSettings.png"
              width={1000}
              height={1000}
              className="w-1/2"
            />
            <p>
              Now Notion should be setup! You will see your Shopping list on
              friday!
            </p>
          </div>
        </div>
      </>
    );
  }
}
