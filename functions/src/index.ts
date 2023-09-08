import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const updateBalanceOfUsers = functions.firestore
  .document("transactions/{id}")
  .onCreate(async (snapshot) => {
    const idSender = snapshot.data().idSender;
    const idReceiver = snapshot.data().idReceiver;

    let refS = null;
    let refR = null;
    if (snapshot.data().type == "deposit") {
      refS = "clubs";
      refR = "users";
    } else if (snapshot.data().type == "payment") {
      refS = "users";
      refR = "clubs";
    } else {
      refS = "users";
      refR = "users";
    }

    const sRef = (await admin.firestore().collection(refS).doc(idSender));
    const rRef = (await admin.firestore().collection(refR).doc(idReceiver));

    const senderInfo = (await(await sRef).get()).data();
    const receiverInfo = (await(await rRef).get()).data();

    let newSenderBalance = 0;
    let newReceiverBalance = 0;

    if (snapshot.data().type == "deposit") {
      newSenderBalance = senderInfo?.total + snapshot.data().amount;
      newReceiverBalance = receiverInfo?.total + snapshot.data().amount;
    } else if (snapshot.data().type == "payment") {
      newSenderBalance = senderInfo?.total - snapshot.data().amount;
      newReceiverBalance = receiverInfo?.total - snapshot.data().amount;
    } else {
      newSenderBalance = senderInfo?.total - snapshot.data().amount;
      newReceiverBalance = receiverInfo?.total + snapshot.data().amount;
    }

    const seRef = admin.firestore().collection(refS).doc(idSender);
    const reRef = admin.firestore().collection(refR).doc(idReceiver);

    seRef.update({total: newSenderBalance});
    reRef.update({total: newReceiverBalance});
  });

export const sendNotificationOnTransaction = functions.firestore
  .document("transactions/{id}")
  .onCreate(async (snapshot) => {
    const trans = snapshot.data();
    if (trans.idReceiver != trans.idClub) {
      const ref = admin.firestore().collection("users").doc(trans.idReceiver);
      const rInfo = (await ref.get()).data();
      const msg = {
        token: rInfo?.fcmToken,
        notification: {
          title: "New Transaction Incoming",
          body: `${rInfo?.firstName} ${rInfo?.lastName} made you a transfer.`,
        },
      };
      admin.messaging().send(msg);
    }
  });

export const sendNotificationOnEvent = functions.firestore
  .document("events/{id}")
  .onCreate(async (snapshot) => {
    const event = snapshot.data();
    const ref = admin.firestore().collection("users");
    const members = (await ref.where("idClub", "==", event.idClub).get()).docs;
    members.forEach((member) => {
      const msg = {
        token: member.data().fcmToken,
        notification: {
          title: "New Event Added",
          body: `${event.title}`,
        },
      };
      admin.messaging().send(msg);
    });
  });
