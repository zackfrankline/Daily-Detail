exports.PaymentController = {
  updateUserSubscription: async (UserId, db) => {
    try {
      const userDocRef = await db.collection("Users").doc(UserId);
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);
      const userSubscriptionResult = await userDocRef.set(
        {
          active_subscription: true,
          subscription_start_date: new Date(),
          subscription_end_date: endDate,
        },
        { merge: true }
      );
      return userSubscriptionResult;
    } catch (error) {
      console.log("Payment Controller Error:", error);
    }
  },
  updateWashReservations: async (userId,db) => {
    try {
      const washReservationDocRef = await db.collection("Wash Reservation").doc();
      const reservationResult = await washReservationDocRef.set({
        user_id:userId,
        wash_start_date:new Date(),
      })

    } catch (error) {
      console.log("Wash reservation Update(error):",error)
      
    }
  }
};
