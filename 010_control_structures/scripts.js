// let isLoggedIn = false;

// if (!isLoggedIn) {
//   console.log("User is NOT logged in");
// }

for (let i = 0; i < 10; i++) {
  console.log(i);
}

const users = ["Max", "Anna", "Joel"];

for (user of users) {
  console.log(user);
}

for (let i = 0; i < users.length; i++) {
  console.log(users[i]);
}

const loggedUser = {
  name: "Nic",
  age: 23,
  isAdmin: true,
  address: {
    street: "random",
    number: 4,
    // zip: {
    //   code: 23423423,
    //   city: "Lis",
    // },
  },
};

// for (info in loggedUser) {
//   console.log(info);
//   console.log(loggedUser[info]);
// }

document.body.innerText = loggedUser.address?.zip?.city ?? "not informed";
