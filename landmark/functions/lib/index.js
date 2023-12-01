"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLandmark = void 0;
const functions = require("firebase-functions");
const vision_1 = require("@google-cloud/vision");
exports.validateLandmark = functions.https.onRequest(async (req, res) => {
    const client = new vision_1.default.ImageAnnotatorClient();
    try {
        const projectId = "s-travel-dwmlrw";
        const bucketName = `${projectId}.appspot.com/uploads`;
        const fileName = `${req.body.photoId}`;
        const [result] = await client.landmarkDetection(`gs://${bucketName}/${fileName}`);
        const landmarks = result.landmarkAnnotations || [];
        console.log("Landmarks:");
        landmarks.forEach((landmark) => console.log(landmark));
        res.send(landmarks);
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
});
//# sourceMappingURL=index.js.map