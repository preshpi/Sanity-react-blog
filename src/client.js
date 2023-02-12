import client from "@sanity/client";

export default client({
    projectId: "5zdi3aqw",
    dataset: "production",
    useCdn: true,
    apiVersion: "2022-09-14"
})