export interface User {
  id: string;
  name: string;
}

const users: User[] = [
  { id: "0004466785", name: "Carlitos" },
  { id: "0004466786", name: "Carlitos" },
  { id: "0004466787", name: "Carlitos" },
  { id: "0004466788", name: "Carlitos" },
  { id: "0004466789", name: "Carlitos" },
  { id: "0004466790", name: "Carlitos" },
  { id: "0004466791", name: "Carlitos" },
  { id: "0004466792", name: "Carlitos" },
  { id: "0004466793", name: "Carlitos" },
  { id: "0004466794", name: "Carlitos" },
];

export async function authenticate(id: string, passwordAttempt: string): Promise<User | null> {
  const user = users.find((user) => user.id === id);

  // Password is in plaintext to comply with project requests and avoid credential storage
  const passwordValid = 
    (id === "0004466785" && passwordAttempt === "Carlitos90") ||
    (id === "0004466786" && passwordAttempt === "Carlitos91") ||
    (id === "0004466787" && passwordAttempt === "Carlitos92") ||
    (id === "0004466788" && passwordAttempt === "Carlitos93") ||
    (id === "0004466789" && passwordAttempt === "Carlitos94") ||
    (id === "0004466790" && passwordAttempt === "Carlitos95") ||
    (id === "0004466791" && passwordAttempt === "Carlitos96") ||
    (id === "0004466792" && passwordAttempt === "Carlitos97") ||
    (id === "0004466793" && passwordAttempt === "Carlitos98") ||
    (id === "0004466794" && passwordAttempt === "Carlitos99");

  if (user && passwordValid) {
    return user;
  }
  return null;
}
