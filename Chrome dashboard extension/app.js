let body = document.querySelector(".body");
let loca = document.querySelector(".loca");
let time = document.querySelector(".time");

// unsplash api

fetch(
  "https://api.unsplash.com/photos/random?client_id=4GFtEqjM-Z-fA2YGztc8axk-GOZZWtkASK61EsnVR1E&orientation=landscape"
)
  .then((res) => res.json())
  .then((data) => {
    body.style.backgroundImage = `url(${data.urls.regular})`;
    loca.textContent = data.user.name;
  })
  .catch((err) => {
    body.style.backgroundImage = `url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80)`;
  });

// dodgecoin api
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => res.json())
  .then((data) => {
    document.querySelector(
      ".crypto-top"
    ).innerHTML = `<img src=${data.image.small} />
    <span>${data.name}</span>`;

    document.querySelector(
      "#crypto"
    ).innerHTML += `<p>Current : ${data.market_data.current_price.inr}</p>
    <p>High : ${data.market_data.high_24h.inr}</p>
    <p>Low : ${data.market_data.low_24h.inr}</p>
    
    `;
  })
  .catch((err) => console.log(err));

// getting time using vanilla js
function getTime() {
  let d = new Date();
  time.textContent = d.toLocaleTimeString("en-US", { timeStyle: "short" });
}

setInterval(getTime, 1000);

// location
navigator.geolocation.getCurrentPosition((position) => {
  let i = "";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=979c340bdde65e98ed678a69f633c00d&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Something went wrong !");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);

      const temp = Math.round(data.main.temp);
      const city = data.name;
      document.querySelector(
        ".up"
      ).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        <p class="up-para">${temp}°C</p>
        `;

      document.querySelector(".down").textContent = city;
    })
    .catch((err) => console.log(err));
});

// http://openweathermap.org/img/wn/10d@2x.png
