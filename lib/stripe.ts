import {
    createCheckoutSession,
    getStripePayments,
} from "@stripe/firestore-stripe-payments";
import { getFunctions, httpsCallable } from "@firebase/functions";
import { app } from "../firebase";

const payments = getStripePayments(app, {
    productsCollection: "products",
    customersCollection: "customers",
});

async function loadCheckout(priceId: string) {
    await createCheckoutSession(payments, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    })
        .then((snapshot) => window.location.assign(snapshot.url))
        .catch((error) => console.log(error.message));
}

async function goToBillingPortal() {
    const instance = getFunctions(app, "europe-west1");
    const functionRef = httpsCallable(
        instance,
        "ext-firestore-stripe-payments-createPortalLink"
    );

    const { data }: any = await functionRef({
        returnUrl: window.location.origin,
    });
    window.location.assign(data.url);
}

export { loadCheckout, payments, goToBillingPortal };
