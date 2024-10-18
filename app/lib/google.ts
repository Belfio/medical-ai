import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import { JSONClient } from "google-auth-library/build/src/auth/googleauth";

const credentials = {
  type: "service_account",
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
  universe_domain: "googleapis.com",
};
// Scopes for accessing Google Drive
const SCOPES = ["https://www.googleapis.com/auth/drive"];

// Authenticate with the service account
const auth = new GoogleAuth({
  credentials: credentials,
  scopes: SCOPES,
}) as GoogleAuth<JSONClient>;

const drive = google.drive({ version: "v3", auth });

export { drive };

// import { promises as fs } from "fs";
// import path from "path";
// import process from "process";
// import { authenticate } from "@google-cloud/local-auth";
// import { google } from "googleapis";

// // If modifying these scopes, delete token.json.
// const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = path.join(process.cwd(), "token.json");
// const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

// import { OAuth2Client } from "google-auth-library";

// /**
//  * Reads previously authorized credentials from the save file.
//  *
//  * @return {Promise<OAuth2Client | null>}
//  */
// async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
//   try {
//     const content = await fs.readFile(TOKEN_PATH, "utf-8");
//     const credentials = JSON.parse(content);
//     return google.auth.fromJSON(credentials) as OAuth2Client;
//   } catch (err) {
//     return null;
//   }
// }

// /**
//  * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
//  *
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
// async function saveCredentials(client: OAuth2Client): Promise<void> {
//   const content = await fs.readFile(CREDENTIALS_PATH, "utf-8");
//   const keys = JSON.parse(content);
//   const key = keys.installed || keys.web;
//   const payload = JSON.stringify({
//     type: "authorized_user",
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });
//   await fs.writeFile(TOKEN_PATH, payload);
// }

// /**
//  * Load or request or authorization to call APIs.
//  *
//  */
// async function authorize(): Promise<OAuth2Client> {
//   let client: OAuth2Client | null = await loadSavedCredentialsIfExist();
//   if (client) {
//     return client;
//   }
//   client = (await authenticate({
//     scopes: SCOPES,
//     keyfilePath: CREDENTIALS_PATH,
//   })) as OAuth2Client;
//   if (client.credentials) {
//     await saveCredentials(client);
//   }
//   return client;
// }

// /**
//  * Lists the names and IDs of up to 10 files.
//  * @param {OAuth2Client} authClient An authorized OAuth2 client.
//  */
// async function listFiles(authClient: OAuth2Client): Promise<void> {
//   const drive = google.drive({ version: "v3", auth: authClient });
//   const res = await drive.files.list({
//     pageSize: 10,
//     fields: "nextPageToken, files(id, name)",
//   });
//   const files = res.data.files;
//   if (!files || files.length === 0) {
//     console.log("No files found.");
//     return;
//   }

//   console.log("Files:");
//   files.map((file) => {
//     console.log(`${file.name} (${file.id})`);
//   });
// }

// // authorize().then(listFiles).catch(console.error);

// const gLib = {
//   authorize,
//   listFiles,
// };

// export default gLib;
