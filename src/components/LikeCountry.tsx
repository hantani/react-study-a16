import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { beenCountryState, likeCountryState } from "../atoms";

function LikeCountry() {
  const [beenCountries, setBeenCountries] = useRecoilState(beenCountryState);
  const [likeCountries, setLikeCountries] = useRecoilState(likeCountryState);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const countryNameElem = target.parentElement?.firstChild as HTMLElement;
    const index = likeCountries.indexOf(countryNameElem.innerText);
    if (index > -1) {
      setLikeCountries((prevState) => {
        if (prevState.length > 1) {
          const returnedState = [...prevState];
          returnedState.splice(index, 1);
          return returnedState;
        } else {
          return [];
        }
      });

      setBeenCountries((prevState) => [
        ...prevState,
        countryNameElem.innerText,
      ]);
    }
  };

  useEffect(() => {
    localStorage.setItem("beenCountryState", JSON.stringify(beenCountries));
  }, [beenCountries]);
  useEffect(() => {
    localStorage.setItem("likeCountryState", JSON.stringify(likeCountries));
  }, [likeCountries]);

  return (
    <div>
      <h2>내가 좋아하는 나라들</h2>
      <ul>
        {likeCountries.map((country) => (
          <li key={country}>
            <span>{country}</span>
            <button onClick={onClick}>싫어요</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LikeCountry;
