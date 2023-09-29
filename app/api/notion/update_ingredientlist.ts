import { Client, collectPaginatedAPI } from "@notionhq/client";
import { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints";
import { notion_import_params } from "@/app/global_types/notion_integration";

export async function update_ingredientlist(params: notion_import_params) {
  const notion_client = new Client({
    auth: params.notion_secret,
  });

  const pageSearch = await notion_client.search({
    query: "Prepify Shoppinglist",
    filter: {
      value: "page",
      property: "object",
    },
  });
  let pageID;
  if (pageSearch.results.length === 0) {
    const allPages = await notion_client.search({
      filter: {
        value: "page",
        property: "object",
      },
    });

    if (allPages.results.length === 0) {
      //TODO Message, No pages were found
      return;
    }

    //Creates new Page
    try {
      const newPage = await notion_client.pages.create({
        parent: {
          type: "page_id",
          page_id: allPages.results[0].id,
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: "Prepify Shoppinglist",
                },
              },
            ],
          },
        },
      });
    } catch (error) {
      //TODO Message, Failed to create Page
      return;
    }

    //Sets new Page
    pageID = newPage.id;
  } else {
    pageID = pageSearch.results[0].id;
  }

  const pageContent = await notion_client.blocks.children.list({
    block_id: pageID,
  });

  //Delete Page content
  await Promise.all(
    pageContent.results.map(async (block) => {
      try {
        await notion_client.blocks.delete({
          block_id: block.id,
        });
      } catch (error) {
        console.log(error);
      }
    })
  );

  //Add new Content to page

  let notion_ingredient_list: BlockObjectRequest[] = [
    {
      object: "block",
      type: "heading_2",
      heading_2: {
        rich_text: [
          {
            type: "text",
            text: {
              content: `This weeks meal: ${params.meal_title}`,
            },
          },
        ],
      },
    },
  ];
  params.ingredient_list.map((ingredient) => {
    notion_ingredient_list.push({
      object: "block",
      type: "to_do",
      to_do: {
        rich_text: [
          {
            type: "text",
            text: {
              content: `${ingredient.name} --> Amount: ${ingredient.measure.amount}${ingredient.measure.unitLong}`,
            },
          },
        ],
      },
    });
  });
  try {
    const newBlocksResponse = await notion_client.blocks.children.append({
      block_id: pageID,
      children: notion_ingredient_list,
    });
  } catch (error) {
    console.log(error);
  }
}
