import * as admin from "firebase-admin";
import {serviceAccount} from "./serviceAccount"

  admin.initializeApp({
    credential:admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: "nodejs-21c0e.appspot.com"
  })

const bucket= admin.storage().bucket()

export {bucket, admin}

