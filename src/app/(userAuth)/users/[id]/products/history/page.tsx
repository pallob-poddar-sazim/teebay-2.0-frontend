import TransactionHistory from "@/modules/transaction-history/containers";
import Tab from "@/shared/components/Tab";

export default async function Page() {
  return (
    <>
      <Tab />
      <div className="mt-20">
        <TransactionHistory />
      </div>
    </>
  );
}
