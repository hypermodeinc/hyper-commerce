import { Suspense } from "react";
import { ProductDetails } from "../../components/product-details";
import { ProductSkeleton } from "../../components/skeletons";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div className="px-4">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetails id={id} />
      </Suspense>
    </div>
  );
}
