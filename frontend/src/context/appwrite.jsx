import { Client, Account, ID } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66580c53001eb83ec874");

export const account = new Account(client);
export { ID } from "appwrite";
