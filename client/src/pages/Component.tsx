import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../App/hook";
import { getComponent } from "../feature/componentSlice";

const Component = () => {
  const dispatch = useAppDispatch();
  const { components } = useAppSelector((state) => state.component);

  useEffect(() => {
    dispatch(getComponent("8"));
  }, [dispatch]);

  console.log(components);

  return (
    <div>
      {components.map((component) => (
        <>{component.name}</>
      ))}
    </div>
  );
};

export default Component;
