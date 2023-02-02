import { Product } from "@stripe/firestore-stripe-payments";
import { HiCheck, HiMinus } from "react-icons/hi";

interface Props {
    products: Product[];
    selectedPlan: Product;
}

function Table({ products, selectedPlan }: Props) {
    return (
        <table>
            <tbody className="divide-y divide-[gray]">
                <tr className="tableRow">
                    <td className="tableDataTitle">Monthly price</td>
                    {products.map((product) => (
                        <td
                            key={product.id}
                            className={`tableDataFeature ${
                                selectedPlan?.id === product.id
                                    ? "opacity-100  text-[#E50914]"
                                    : "opacity-60"
                            }`}
                        >
                            {product.prices[0].unit_amount! / 100}€
                        </td>
                    ))}
                </tr>

                <tr className="tableRow">
                    <td className="tableDataTitle">Video quality</td>
                    {products.map((product) => (
                        <td
                            key={product?.id}
                            className={`tableDataFeature ${
                                selectedPlan.id === product.id
                                    ? "opacity-100 text-[#E50914]"
                                    : "opacity-60"
                            }`}
                        >
                            {product.metadata.videoQuality}
                        </td>
                    ))}
                </tr>
                <tr className="tableRow">
                    <td className="tableDataTitle">Resolution</td>
                    {products.map((product) => (
                        <td
                            className={`tableDataFeature ${
                                selectedPlan?.id === product.id
                                    ? "text-[#E50914]"
                                    : "opacity-60"
                            }`}
                            key={product.id}
                        >
                            {product.metadata.resolution}
                        </td>
                    ))}
                </tr>
                <tr className="tableRow">
                    <td className="tableDataTitle">
                        Watch on your TV, computer, mobile phone and tablet
                    </td>
                    {products.map((product) => (
                        <td
                            className={`tableDataFeature ${
                                selectedPlan?.id === product.id
                                    ? "text-[#E50914]"
                                    : "opacity-60"
                            }`}
                            key={product.id}
                        >
                            {product.metadata.portability === "true" && (
                                <HiCheck className="inline-block h-8 w-8" />
                            )}
                        </td>
                    ))}
                </tr>
                <tr className="tableRow">
                    <td className="tableDataTitle">Downloads</td>
                    {products.map((product) => (
                        <td
                            className={`tableDataFeature ${
                                selectedPlan?.id === product.id
                                    ? "text-[#E50914]"
                                    : "opacity-60"
                            }`}
                            key={product.id}
                        >
                            {product.metadata.download === "true" ? (
                                <HiCheck className="inline-block h-8 w-8" />
                            ) : (
                                <HiMinus className="inline-block h-8 w-8" />
                            )}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}

export default Table;
