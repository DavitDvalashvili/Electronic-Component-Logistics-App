import { useAppSelector } from "../App/hook";
import { RootState } from "../App/store";
import FilterContainer from "../components/FilterContainer";

const Components = () => {
  const { components } = useAppSelector((state: RootState) => state.component);

  console.log(components);

  return (
    <main>
      <FilterContainer />
    </main>
  );
};

export default Components;
