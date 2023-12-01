import * as functions from "firebase-functions";
import vision from "@google-cloud/vision";

export const validateLandmark = functions.https.onRequest(
  async (req: functions.https.Request, res: functions.Response<any>) => {
    const client = new vision.ImageAnnotatorClient();
    try {
      const projectId = "s-travel-dwmlrw";
      const bucketName = `${projectId}.appspot.com/uploads`;
      const fileName = `${req.body.photoId}`;
      const [result] = await client.landmarkDetection(
        `gs://${bucketName}/${fileName}`
      );
      const landmarks = result.landmarkAnnotations || [];

      console.log("Landmarks:");
      landmarks.forEach((landmark: any) => console.log(landmark));

      res.send(landmarks);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
);
