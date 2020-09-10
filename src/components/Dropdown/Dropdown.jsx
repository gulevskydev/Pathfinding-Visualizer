import React from "react";
import "./Dropdown.scss";
export default function Dropdown({ setActiveAlgo }) {
  function handleSelectEvent(e) {
    console.log(e.target);
    setActiveAlgo(e.target.value);
  }

  return (
    <div class="select-box">
      <div class="select-box__current" tabindex="1">
        <div class="select-box__value">
          <input
            class="select-box__input"
            type="radio"
            id="0"
            value="1"
            name="algo"
            checked="checked"
          />
          <p class="select-box__input-text">Diijkstra</p>
        </div>
        <div class="select-box__value">
          <input
            class="select-box__input"
            type="radio"
            id="1"
            value="2"
            name="algo"
            checked="checked"
          />
          <p class="select-box__input-text">Cheese</p>
        </div>
        <div class="select-box__value">
          <input
            class="select-box__input"
            type="radio"
            id="2"
            value="3"
            name="algo"
            checked="checked"
          />
          <p class="select-box__input-text">Milk</p>
        </div>
        <div class="select-box__value">
          <input
            class="select-box__input"
            type="radio"
            id="3"
            value="4"
            name="algo"
            checked="checked"
          />
          <p class="select-box__input-text">Honey</p>
        </div>

        <img
          class="select-box__icon"
          src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
          alt="Arrow Icon"
          aria-hidden="true"
        />
      </div>
      <ul class="select-box__list">
        <li>
          <label
            class="select-box__option"
            for="0"
            aria-hidden="aria-hidden"
            onChange={(e) => handleSelectEvent(e)}>
            Diijkstra
          </label>
        </li>
        <li>
          <label
            class="select-box__option"
            for="1"
            aria-hidden="aria-hidden"
            onChange={(e) => handleSelectEvent(e)}>
            > 2
          </label>
        </li>
        <li>
          <label
            class="select-box__option"
            for="2"
            aria-hidden="aria-hidden"
            onChange={(e) => handleSelectEvent(e)}>
            > 3
          </label>
        </li>
        <li>
          <label
            class="select-box__option"
            for="3"
            aria-hidden="aria-hidden"
            onChange={(e) => handleSelectEvent(e)}>
            > 4
          </label>
        </li>
      </ul>
    </div>
  );
}
