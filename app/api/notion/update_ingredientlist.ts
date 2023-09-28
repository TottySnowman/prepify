import { Client, collectPaginatedAPI } from "@notionhq/client";
import { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints";
import { notion_import_params } from "@/app/global_types/notion_integration";

export default async function update_ingredientlist(
  params: notion_import_params
) {
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
  if ((pageSearch.results.length = 0)) {
    return;
  }

  const pageID = pageSearch.results[0].id;
  const pageContent = await notion_client.blocks.children.list({
    block_id: pageID,
  });

  //Delete Page content

  pageContent.results.map(async (block) => {
    try {
      const blockResponse = await notion_client.blocks.delete({
        block_id: block.id,
      });
    } catch (error) {
      console.log(error);
    }
  });
}
