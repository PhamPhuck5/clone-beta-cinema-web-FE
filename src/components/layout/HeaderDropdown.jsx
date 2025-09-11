import { Fragment } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";

import actionTypes from "../../store/actions/actionTypes";
import vi from "../../translations/vi.json";

import "./headerDropdown.scss";
//todo: split this to 2 component and use memo for the submenu
const CinemaDropdown = () => {
  const { cityKey, cinemaKey } = useSelector((state) => state.app);
  const curCinemaKey = `cinema.${cityKey}.${cinemaKey}`;

  const dispatch = useDispatch();

  const cityKeys = Object.keys(vi.city);

  let changeCinema = (cinemaKey, cityKey) => {
    dispatch({
      type: actionTypes.APP_CHOOSE_CINEMA,
      cinemaKey: cinemaKey,
      cityKey: cityKey,
    });
  };

  let getCinemaList = (cityKey) => {
    return (
      <Fragment key={cityKey}>
        <div className="dropdown-submenu">
          <Dropdown.Item className="dropdown-item">
            <FormattedMessage id={"city." + cityKey} />
          </Dropdown.Item>
          <ul className="submenu">
            {Object.keys(vi.cinema[cityKey]).map((cinemaKey) => {
              return (
                <li key={cinemaKey}>
                  <button
                    className="dropdown-subitem"
                    onClick={() => {
                      changeCinema(cinemaKey, cityKey);
                    }}
                  >
                    <FormattedMessage
                      id={"cinema." + cityKey + "." + cinemaKey}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Fragment>
    );
  };
  return (
    <div className="dropdown-hover-wrapper">
      <Dropdown>
        <Dropdown.Toggle className="toggle" id="dropdown-basic">
          <FormattedMessage id={curCinemaKey} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {cityKeys.map((cityKey) => getCinemaList(cityKey))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CinemaDropdown;
