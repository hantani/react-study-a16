import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState } from "recoil";
import { countryState } from "../atoms";

interface IForm {
  wantCountry: string;
}

function WantCountry() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [countries, setCountries] = useRecoilState(countryState);
  const onValidate: SubmitHandler<IForm> = (data) => {
    const newCountry = {
      countryName: data.wantCountry,
      status: "wannaGo",
    };
    setCountries((prevState) => [...prevState, newCountry]);
    setValue("wantCountry", "");
  };

  return (
    <div>
      <h2>내가 가고싶은 나라들</h2>
      <form onSubmit={handleSubmit(onValidate)}>
        <input type="text" {...register("wantCountry", { required: true })} />
        <input type="submit" value="가자" />
      </form>
      <ul>
        {countries.map((country) => (
          <li>{country.countryName}</li>
        ))}
      </ul>
    </div>
  );
}

export default WantCountry;
