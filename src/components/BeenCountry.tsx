import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { wantCountryState, beenCountryState, likeCountryState } from "../atoms";

function BeenCountry() {
  const [wantCountries, setWantCountries] = useRecoilState(wantCountryState);
  const [beenCountries, setBeenCountries] = useRecoilState(beenCountryState);
  const [likeCountries, setLikeCountries] = useRecoilState(likeCountryState);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const countryNameElem = target.parentElement?.firstChild as HTMLElement;
    const index = beenCountries.indexOf(countryNameElem.innerText);
    if (index > -1) {
      setBeenCountries((prevState) => {
        if (prevState.length > 1) {
          const returnedState = [...prevState];
          returnedState.splice(index, 1);
          return returnedState;
        } else {
          return [];
        }
      });
    }

    if (target.innerText === "좋아요") {
      setLikeCountries((prevState) => [
        ...prevState,
        countryNameElem.innerText,
      ]);
    } else if (target.innerText === "취소") {
      setWantCountries((prevState) => [
        ...prevState,
        countryNameElem.innerText,
      ]);
    }
  };

  useEffect(() => {
    localStorage.setItem("wantCountryState", JSON.stringify(wantCountries));
  }, [wantCountries]);
  useEffect(() => {
    localStorage.setItem("beenCountryState", JSON.stringify(beenCountries));
  }, [beenCountries]);
  useEffect(() => {
    localStorage.setItem("likeCountryState", JSON.stringify(likeCountries));
  }, [likeCountries]);

  return (
    <div>
      <h2>내가 가고싶은 나라들</h2>
      <ul>
        {beenCountries.map((country) => (
          <li key={country}>
            <span>{country}</span>
            <button onClick={onClick}>좋아요</button>
            <button onClick={onClick}>취소</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BeenCountry;
