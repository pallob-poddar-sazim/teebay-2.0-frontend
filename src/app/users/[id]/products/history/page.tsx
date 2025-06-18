import TransactionHistory from "@/components/templates/TransactionHistory";
import Tab from "@/components/organisms/Tab";

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
