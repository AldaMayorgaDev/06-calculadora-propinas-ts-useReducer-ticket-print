import type {Dispatch, SetStateAction} from "react";
const tipOptions = [
  {
    id: "tip-0",
    value: 0,
    label: "Sin propina",
  },
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
  tip: number;
};
const TipPercentageForm = ({setTip, tip}: TipPercentageFormPropsT) => {
  return (
    <div>
      <h3 className="font-bold text-2xl mb-3">Propina:</h3>

      <form action="">
        {tipOptions.map((option) => {
          return (
            <div
              key={option.id}
              className="flex items-center gap-2 max-w-26 justify-between
            "
            >
              <label htmlFor={option.id}>{option.label}</label>
              <input
                type="radio"
                name="tip"
                id={option.id}
                value={option.value}
                checked={tip === option.value}
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
