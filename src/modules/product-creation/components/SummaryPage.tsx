import { ICategory } from "@/shared/typedefs";
import { TSummaryPageProps } from "./ProductCreationForm.types";

const SummaryPage = (props: TSummaryPageProps) => {
  const selectedCategories = props.categories.filter((category: ICategory) =>
    props.formValues.categoryIds.includes(category.id),
  );

  return (
    <div className="space-y-6">
      <p className="text-2xl font-medium text-jet-black">Summary</p>
      <p>Title: {props.formValues.title}</p>
      <p>Categories: {selectedCategories.map((category: ICategory) => category.name).join(", ")}</p>
      <p>Description: {props.formValues.description}</p>
      <p>
        Price: ${props.formValues.price}, To Rent: ${props.formValues.rent} per{" "}
        {props.formValues.rentOption}
      </p>
    </div>
  );
};

export default SummaryPage;
