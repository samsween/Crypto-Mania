const URL = "https://www.coingecko.com/en/coins";

const emitPrices = async (io, coin, page, openRooms) => {
  let prices = setInterval(async () => {
    if (!io.sockets?.adapter?.rooms?.get(coin)) {
      clearInterval(prices);
      openRooms[coin] = false;
      await page.close();
      return;
    }
    let result = await page.evaluate(getDataFromPage);
    io.to(coin).emit("price", result);
  }, 5000);
};

const getDataFromPage = async () => {
  let img = Array.from(document.querySelectorAll("img"))?.filter((el) =>
    el.src.toLowerCase().includes("small")
  )[0].src;
  const els = {
    data: Array.from(document.querySelectorAll("tr"))
      ?.slice(0, 8)
      ?.map((el) => el.innerText.split("\t"))
      ?.map((el, index) => {
        return {
          name: el[0],
          value:
            index === 0
              ? parseFloat(
                  el[1].replace("$", "").replace(",", "").replace("A", "")
                )
              : el[1],
        };
      }),
    image: img,
    price: document
      .querySelector("span [data-coin-id]")
      .innerText.replace(/[^\d.-]/g, ""),
  };
  return { ...els };
};

async function initIo(io, browser) {
  let openRooms = {};
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("get-price", async (coin) => {
      socket.join(coin);
      if (openRooms[coin]) {
        return;
      }
      openRooms[coin] = true;
      const page = await browser.newPage();
      await page
        .goto(URL + `/${coin}`, {
          waitUntil: "domcontentloaded",
        })
        .catch((err) => {
          console.log(err);
        });
      await page.click('[data-target="currency-dropdown.button"]');
      await page.click('[data-iso-code="aud"]');
      let result = await page.evaluate(getDataFromPage);
      io.to(coin).emit(`price`, result);
      emitPrices(io, coin, page, openRooms);
    });
    socket.on("leave-room", (coin) => {
      socket.leave(coin);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}

module.exports = initIo;
