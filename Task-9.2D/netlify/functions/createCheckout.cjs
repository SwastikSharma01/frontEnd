const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    ),
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { priceId, uid } = body;

    if (!priceId || !uid) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing UID or price ID" }),
      };
    }

    // Get user from Firestore
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();
    let stripeCustomerId = userDoc.exists ? userDoc.data().stripeCustomerId : null;

    // If user doesn’t have a Stripe customer, create one
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        metadata: { firebaseUID: uid },
      });
      stripeCustomerId = customer.id;
      await userRef.set({ stripeCustomerId }, { merge: true });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer: stripeCustomerId,
      success_url: `${process.env.FRONTEND_URL}/payment-success?uid=${uid}`,
      cancel_url: `${process.env.FRONTEND_URL}/plans`,
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    console.error("Stripe error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
