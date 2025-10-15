import { Client, User } from "../src";

describe("Trying to create client", () => {
  const client = new Client(process.env["API_KEY"] as string); // fake key
  test("Get user uploads", async () => {
    const result = await client.getGallery();
    console.info(result.uploads[0]);
    expect(result.uploads[0]).toEqual({
      ...result.uploads[0],
    });
  });
  test("Get user info", async () => {
    const result = await client.getMe();
    console.info(result);
    const expectResult: User = {
      id: "407859300527243275",
      plus: true,
      verified: true,
      suspended: false,
      created: result.user.created,
      keyHasUploadsAccess: true,
      uploads: result.user.uploads,
      key: result.user.key,
    };
    expect(result).toEqual({
      user: expectResult,
    });
  });
  test("Get other user info", async () => {
    const result = await client.getUser("364836696149458944");
    console.info(result);
    const expectResult: User = {
      id: "364836696149458944",
      plus: true,
      verified: true,
      suspended: false,
      created: result.user.created,
    };
    expect(result).toEqual({
      user: expectResult,
    });
  });
  it("Upload image", async () => {
    const res = await fetch(
      "https://i.snipp.gg/407859300527243275/7ab3c3877c98052b156a98757795f401.png",
    );
    const buffer = await res.arrayBuffer();
    const blob = new Blob([buffer], {
      type: res.headers.get("content-type") || "image/png",
    });
    await client.upload(blob);
  });
});
