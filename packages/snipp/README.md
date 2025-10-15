# Snipp.gg API Wrapper

A simple and modern **TypeScript** wrapper for the [Snipp.gg](https://snipp.gg) API.  
It provides convenient access to the main API (`api.snipp.gg`) and the upload API (`nano.snipp.gg`) for image uploads.

---

## Installation

```bash
npm install snipp.gg
# or
yarn add snipp.gg
```

---

## Basic Usage

```ts
import { Client } from "snipp.gg";

const client = new Client("YOUR_API_KEY");

// Example: get authenticated user
const me = await client.getMe();
console.log(me.user);

// Example: list public uploads
const gallery = await client.getGallery();
console.log(gallery.uploads);

// Example: get a specific user
const user = await client.getUser("123456789012345678");
console.log(user.user);
```

---

## Image Uploads

The upload endpoint (`nano.snipp.gg`) **only accepts image files**.
You can upload an image directly from a `File` (browser) or `Blob`.

```ts
const file = new File(
  [
    /* image data */
  ],
  "image.png",
  { type: "image/png" },
);
const upload = await client.upload(file);

console.log(upload);
```

> **Tip:** To upload an image from a URL in Node.js, use `node-fetch`:
>
> ```ts
> import fetch from "node-fetch";
> const res = await fetch("https://example.com/image.png");
> const blob = await res.blob();
>
> const upload = await client.upload(blob);
> console.log(upload);
> ```
>
> Or upload a local image using `fs`:
>
> ```ts
> import fs from "fs";
> import fetch from "node-fetch";
> import { Blob } from "buffer";
>
> const buffer = fs.readFileSync("my-image.png");
> const blob = new Blob([buffer], { type: "image/png" });
>
> const upload = await client.upload(blob);
> console.log(upload);
> ```

---

## Available Methods

| Method         | Description                    | Endpoint                       |
| :------------- | :----------------------------- | :----------------------------- |
| `getGallery()` | Returns public image uploads   | `GET /uploads`                 |
| `upload(file)` | Uploads an image file          | `POST /upload` (nano.snipp.gg) |
| `getMe()`      | Returns the authenticated user | `GET /users/@me`               |
| `getUser(id)`  | Returns a specific user        | `GET /users/:id`               |

---

## License

This project is licensed under the **MIT License**.
Feel free to use, modify, and contribute. ✨

---

## 💬 Credits

Built with ❤️ by [Igor Figueiredo](https://github.com/igorfigueiredo).
