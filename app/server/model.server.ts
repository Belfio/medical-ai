import { Builder, By, WebDriver, Browser } from "selenium-webdriver";
import s3 from "~/lib/s3";
import { drive } from "./googleApi.server";

// Function to upload a file to Google Drive
async function uploadFileFromS3(s3Path: string) {
  try {
    if (!s3Path.split("/").pop()) {
      throw new Error("Invalid S3 path");
    }
    const fileName = s3Path.split("/").pop()!;

    const fileMetadata = { name: fileName, fields: "id" };
    const file = await s3.models.getStream(s3Path);
    const mimeType = "application/x-ipynb+json";
    const media = { mimeType: mimeType, body: file };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });
    console.log("response", response);
    const permissions = {
      type: "user",
      role: "writer",
      emailAddress: "a.belfiori@gmail.com", // 'user@partner.com',
    };
    const response2 = await drive.permissions.create({
      resource: permissions,
      fileId: response.data.id,
      fields: "id",
    });
    console.log("response2 ID", response2.data.id);
    return response.data.id;
  } catch (error) {
    console.error(
      "Error uploading file to Google Drive:",
      (error as Error).message || error
    );
    throw error;
  }
}

// Function to simulate a click on the "Run All" button
function runAllCells(driver: WebDriver) {
  driver
    .findElement(
      By.xpath('//colab-run-button | //paper-icon-button[@icon="play-arrow"]')
    )
    .then((runButton) => runButton.click())
    .then(() => driver.sleep(300000)); // Wait for 5 minutes (can be adjusted)
}

// High-level function to manage the entire Colab running process
function runColab(colabUrl: string) {
  const driver = new Builder().forBrowser(Browser.SAFARI).build();

  return driver
    .get(colabUrl)
    .then(() => driver.sleep(5000)) // Wait for the notebook to load
    .then(() => runAllCells(driver)) // Run all cells
    .finally(() => driver.quit()); // Close the browser after execution
}

async function testModel(s3Path: string) {
  await uploadFileFromS3(s3Path);
  // .then(fileId=>"https://colab.research.google.com/drive/"+fileId)
  // .then((colabUrl: string) => {
  //   console.log("Notebook uploaded to:", colabUrl);
  //   return runColab(colabUrl); // Now run the notebook in Colab
  // })
  // .catch(console.error);
}
const ds = { testModel };
export default ds;
