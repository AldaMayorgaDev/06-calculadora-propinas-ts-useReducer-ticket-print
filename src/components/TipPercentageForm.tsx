import type {Dispatch, SetStateAction} from "react";
const tipOptions = [
  {
    id: "tip-10",
    value: 0.1,
    label: "10%",
  },
  {
    id: "tip-20",
    value: 0.2,
    label: "20%",
  },
  {
    id: "tip-50",
    value: 0.5,
    label: "50%",
  },
];
type TipPercentageFormPropsT = {
  setTip: Dispatch<SetStateAction<number>>;
};
const TipPercentageForm = ({setTip}: TipPercentageFormPropsT) => {
  return (
    <div>
      <h3 className="font-bold text-2xl mb-3">Propina:</h3>

      <form action="">
        {tipOptions.map((tip) => {
          return (
            <div
              key={tip.id}
              className="flex items-center gap-2 max-w-14 justify-between
            "
            >
              <label htmlFor={tip.id}>{tip.label}</label>
              <input
                type="radio"
                name="tip"
                id={tip.id}
                value={tip.value}
                onChange={(e) => setTip(+e.target.value)}
              />
            </div>
          );
        })}
        <div></div>
      </form>
    </div>
  );
};

export default TipPercentageForm;
