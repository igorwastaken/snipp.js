import { BaseClient } from "./BaseClient";

export type Snowflake = string;
export interface Upload {
  url: string;
  uploaded: string;
  size: string;
}
export interface User {
  id: Snowflake;
  plus: boolean;
  verified: boolean;
  suspended: boolean;
  created: Date;
  key?: string;
  uploads?: number;
  keyHasUploadsAccess?: boolean;
}
export interface MeUser {
  id: Snowflake;
  plus: boolean;
  verified: boolean;
  suspended: boolean;
  created: Date;
  key: string;
  uploads: number;
  keyHasUploadsAccess: boolean;
}
export interface MeResponse {
  user: MeUser;
}
export interface UserResponse {
  user: User;
}
export interface UploadsResponse {
  uploads: Upload[];
}

export class Client extends BaseClient {
  constructor(apiKey: string) {
    super({
      baseURL: "https://api.snipp.gg",
      apiKey,
      defaultHeaders: {
        Accept: "application/json",
      },
    });
  }
  public getGallery() {
    return this.get<UploadsResponse>("/uploads");
  }
  public async upload(file: File | Blob) {
    const formData = new FormData();
    formData.append("file", file);

    return this.post("/upload", {
      body: formData,
    });
  }
  public getMe() {
    return this.get<MeResponse>(`/users/@me`);
  }
  public getUser(id: Snowflake) {
    return this.get<UserResponse>(`/users/${id}`);
  }
}
