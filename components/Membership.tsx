import useAuth from "@/hooks/useAuth";
import useSubscription from "@/hooks/useSubscription";
import { goToBillingPortal } from "@/lib/stripe";
import { useState } from "react";
import Loader from "./Loader";

function Membership() {
    const { user } = useAuth();
    const subscription = useSubscription(user);
    const [isBillingLoading, setBillingLoading] = useState(false);

    function manageSubscription() {
        if (subscription) {
            setBillingLoading(true);
            goToBillingPortal();
        }
    }

    return (
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
            <div className=" space-y-2 py-4">
                <h4 className="text-lg text-[gray]">Membership & Billing</h4>
                <button
                    disabled={isBillingLoading || !subscription}
                    className="h-10 w-[170px] whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5"
                    onClick={manageSubscription}
                >
                    {isBillingLoading ? (
                        <Loader color="dark:fill-[#e50914]" />
                    ) : (
                        "Manage"
                    )}
                </button>
            </div>

            <div className="col-span-3">
                <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
                    <div>
                        <p>{user?.email}</p>
                        <p>Password: *********</p>
                    </div>

                    <div className="md:text-right">
                        <p className="membershipLink">Change email(soon)</p>
                        <p className="membershipLink">Change password(soon)</p>
                    </div>
                </div>

                <div className=" flex flex-col justify-between pt-6 pb-6 md:pb-0">
                    <div>
                        <p>
                            {subscription?.cancel_at_period_end
                                ? "Your membership will end on "
                                : "Your next billing date is "}
                            {subscription?.current_period_end}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Membership;
