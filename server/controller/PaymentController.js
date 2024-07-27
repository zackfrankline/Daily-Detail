exports.PaymentController = {
  updateUserSubscription: async (UserId, db) => {
    try {
      const userDocRef = await db.collection("Users").doc(UserId);
      const userDoc = await userDocRef.get();
      if (!userDoc.exists) {
        console.log("No Document");
        const writeResult = await userDocRef.set({
          docId: userDocRef.id,
          uid: UserId,
          createdAt: new Date(),
          subscription_start_data: new Date(),
          active_subscription: true,
        });
        return writeResult;
      } else {
        console.log("document data:", userDoc.data());
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
        const writeResult = await userDocRef.set(
          {
            active_subscription: true,
            subscription_start_date: new Date(),
            subscription_end_date: endDate,
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.log("Payment Controller Error:", error);
    }
  },
};
