document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Kopi Susu", img: "Hot-Coffee-Milk.png", price: 15000 },
      {
        id: 2,
        name: "Kopi Espresso",
        img: "Hot-Coffee-Espreso.png",
        price: 20000,
      },
      {
        id: 3,
        name: "Kopi Americano",
        img: "Hot-Americano-Coffee.png",
        price: 20000,
      },
      { id: 4, name: "Kopi Latte", img: "Hot-Latte.png", price: 25000 },
      {
        id: 5,
        name: "Kopi Cappuccino",
        img: "Hot-Cappucino.jpg",
        price: 25000,
      },
      {
        id: 6,
        name: "Kopi Macchiato",
        img: "Hot-Macchiato-Latte.jpg",
        price: 25000,
      },
      { id: 7, name: "Kopi Mocha", img: "Hot-mocha-latte.png", price: 25000 },
      { id: 8, name: "Teh Hangat", img: "hot-tea.jpg", price: 10000 },
      { id: 9, name: "Es Kopi Susu", img: "Iced-Coffee.png", price: 20000 },
      {
        id: 10,
        name: "Es Kopi Americano",
        img: "Es-Kopi-Americano.jpg",
        price: 25000,
      },
      {
        id: 11,
        name: "Es Kopi Latte",
        img: "iced-latte-upscaled.jpg",
        price: 30000,
      },
      {
        id: 12,
        name: "Es Kopi Cappuccino",
        img: "iced-cappuccino.jpg",
        price: 30000,
      },
      {
        id: 13,
        name: "Es Kopi Karamel Macchiato",
        img: "iced-caramel-macchiato.jpg",
        price: 35000,
      },
      { id: 14, name: "Es Kopi Mocha", img: "Es-Kopi-Mocha.jpg", price: 30000 },
      { id: 15, name: "Es Teh ", img: "iced-tea.jpg", price: 10000 },
      { id: 16, name: "Croissant ", img: "croissant.jpg", price: 15000 },
      { id: 17, name: "Bagel ", img: "bagel.jpg", price: 15000 },
      {
        id: 18,
        name: "Chicken Sandwich ",
        img: "chicken-sandwich.jpg",
        price: 25000,
      },
      {
        id: 19,
        name: "Tuna Sandwich ",
        img: "tuna-sandwich.jpg",
        price: 25000,
      },
      {
        id: 20,
        name: "Peanut Butter Panini ",
        img: "peanut-butter-panini.jpg",
        price: 25000,
      },
      {
        id: 21,
        name: "Smoked Beef Panini ",
        img: "smoked-beef-panini.jpg",
        price: 25000,
      },
      { id: 22, name: "Glazed Donut ", img: "glazed-donut.jpg", price: 20000 },
      {
        id: 23,
        name: "Strawberry Sprinkles Donut",
        img: "strawberry-sprinkles-donut.jpg",
        price: 20000,
      },
      {
        id: 24,
        name: "Chocolate Donut",
        img: "chocolate-donut.jpg",
        price: 20000,
      },
      {
        id: 25,
        name: "New York Cheesecake",
        img: "new-york-cheesecake.jpg",
        price: 30000,
      },
      {
        id: 26,
        name: "Blueberry Cheesecake",
        img: "blueberry-cheesecake.jpg",
        price: 30000,
      },
      {
        id: 27,
        name: "Chocolate Cake",
        img: "chocolate-cake.jpg",
        price: 40000,
      },
      {
        id: 28,
        name: "Strawberry Cake",
        img: "slice-of-strawberry-cake.jpg",
        price: 40000,
      },
      { id: 29, name: "Pandan Cake", img: "pandan-cake.jpg", price: 40000 },
      {
        id: 30,
        name: "Carrot Cake",
        img: "slice-of-carrot-cake.jpg",
        price: 40000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // Cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // Jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika barang sudah ada , cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          //Jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            //Jika barang sudah ada , tambah quantity dan subtotalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau diremove berdasarkan idnya
      const cartItem = this.items.find((item) => item.id === id);

      //Jika barang lebih dari satu
      if (cartItem.quantity > 1) {
        // telusuri satu
        this.items = this.items.map((item) => {
          // jika barang yang bukan di klik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // Jika barang sisa satu
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

//Form Validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

//Kirim data ketika tombol checkout diklik
checkoutButton.addEventListener("click", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  // const message = formatMessage(objData);
  //window.open("http://wa.me/081389445043?text=" + encodeURIComponent(message));

  //Minta transaction token menggunakan ajax/fetch
  try {
    const response = await fetch("php/placeOrder.php", {
      method: "POST",
      body: data,
    });
    const token = await response.text();
    //console.log(token);

    window.snap.pay(token);
  } catch (err) {
    console.log(err.message);
  }
});

//format pesan Whatsapp
const formatMessage = (obj) => {
  return `Data Customer
  Email: ${obj.email}
  No.HP: ${obj.phone}
  Data Pesanan
  ${JSON.parse(obj.items).map(
    (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \ n`
  )}
  TOTAL: ${rupiah(obj.total)}
  Terima Kasih.`;
};

// Konversi Ke Rupiah

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
