module.exports = {
    accounts: [
      {
        id: "12345",
        email: "alice@email.com",
        password: "pAsSWoRd!",
        userDetail: {
          id: "1"
        },
        roles: [
          {
            id: "1"
          },
        ]
      },
      {
        id: "67890",
        email: "bob@email.com",
        password: "pAsSWoRd!",
        userDetail: {
          id: "2"
        },
        roles: [
          {
            id: "2"
          },
        ]
      }
    ],
    userDetails: [
      {
        id: "1",
        firstName: "Alice",
        lastName: "Dreams",
        daybirthday: 28,
        monthbirthday: 07,
        yearbirthday: 1991
      },
      {
        id: "2",
        firstName: "Bob",
        lastName: "Minion",
        daybirthday: 01,
        monthbirthday: 01,
        yearbirthday: 2001
      },
    ],
    roles: [
      {
        id: "1",
        name: "admin",
        description: "admin",
        permissions: ["read:any_account", "read:own_account"]
      },
      {
        id: "2",
        name: "subscriber",
        description: "sub",
        permissions: ["read:own_account"]
      },
    ]
  };