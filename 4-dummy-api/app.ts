enum UserField {
  Id = "id",
  FirstName = "firstName",
  LastName = "lastName",
  Age = "age",
  Email = "email",
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;  
}

interface UsersResponse {
  users: User[];
}

async function fetchAndDisplayUsers() {
  try {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data: UsersResponse = await response.json();

    data.users.forEach(user => {
      console.log(
        `${UserField.Id}: ${user.id}, ` +
        `${UserField.FirstName}: ${user.firstName}, ` +
        `${UserField.LastName}: ${user.lastName}, ` +
        `${UserField.Age}: ${user.age}, ` +
        `${UserField.Email}: ${user.email}`
      );
    });
  } catch (error) {
    console.error("Ошибка при получении данных пользователей:", error);
  }
}

fetchAndDisplayUsers();
