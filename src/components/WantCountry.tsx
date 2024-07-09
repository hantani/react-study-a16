import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState } from "recoil";
import { wantCountryState, beenCountryState } from "../atoms";
import { useEffect } from "react";

interface IForm {
  wantCountry: string;
}

function WantCountry() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const [wantCountries, setWantCountries] = useRecoilState(wantCountryState);
  const [beenCountries, setBeenCountries] = useRecoilState(beenCountryState);
  const onValidate: SubmitHandler<IForm> = (data) => {
    setWantCountries((prevState) => {
      return [...prevState, data.wantCountry];
    });
    setValue("wantCountry", "");
  };
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const countryNameElem = target.parentElement?.firstChild as HTMLElement;
    const index = wantCountries.indexOf(countryNameElem.innerText);
    console.log(index);
    if (index > -1) {
      setWantCountries((prevState) => {
        if (prevState.length > 1) {
          const returnedState = [...prevState];
          returnedState.splice(index, 1);
          return returnedState;
        } else {
          return [];
        }
      });
    }

    if (target.innerText === "체크") {
      setBeenCountries((prevState) => {
        return [...prevState, countryNameElem.innerText];
      });
    }
  };
  useEffect(() => {
    localStorage.setItem("wantCountryState", JSON.stringify(wantCountries));
  }, [wantCountries]);
  useEffect(() => {
    localStorage.setItem("beenCountryState", JSON.stringify(beenCountries));
  }, [beenCountries]);

  return (
    <div>
      <h2>내가 가고싶은 나라들</h2>
      <form onSubmit={handleSubmit(onValidate)}>
        <input
          type="text"
          {...register("wantCountry", { required: "Required Erorr" })}
        />
        <input type="submit" value="가자" />
        {errors.wantCountry && <div>{errors.wantCountry.message}</div>}
      </form>
      <ul>
        {wantCountries.map((country) => (
          <li key={country}>
            <span>{country}</span>
            <button onClick={onClick}>체크</button>
            <button onClick={onClick}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WantCountry;
