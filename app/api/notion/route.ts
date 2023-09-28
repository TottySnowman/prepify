import { Client, collectPaginatedAPI } from "@notionhq/client";
import { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints";
import { NextRequest } from "next/server";
export const GET = async (request: NextRequest) => {
  const notion_client = new Client({
    auth: process.env.NOTION_SECRET,
  });

  (async () => {
    const response = await notion_client.search({
      query: "Prepify Shoppinglist",
      filter: {
        value: "page",
        property: "object",
      },
    });
    var pageID = response.results[0].id;
    console.log(pageID);
    var blocks = await notion_client.blocks.children.list({
      block_id: pageID,
    });
    await Promise.all(
      blocks.results.map(async (block) => {
        try {
          const resp = await notion_client.blocks.delete({
            block_id: block.id,
          });
        } catch (error) {
          console.log(error);
        }
      })
    );

    const newBlocks: BlockObjectRequest[] = [
      {
        object: "block",
        type: "code",
        code: {
          language: "c#",
          rich_text: [
            {
              type: "text",
              text: {
                content: "Console.WriteLine('Hello World!')",
              },
            },
          ],
        },
      },
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Sent from API",
              },
            },
          ],
        },
      },
    ];

    const newBlocksResponse = await notion_client.blocks.children.append({
      block_id: pageID, // Replace with your page ID
      children: newBlocks,
    });
  })();

  return new Response("Sent to user:", { status: 200 });
};
