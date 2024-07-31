import { Suspense } from "react";
import { ProductDetails } from "../../components/product-details";
import { ProductSkeleton } from "../../components/skeletons";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="px-4">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetails id={params.id} />
      </Suspense>
    </div>
  );
}
