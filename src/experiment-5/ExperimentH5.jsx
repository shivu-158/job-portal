import { useEffect, useState } from "react";

export default function ExperimentH5() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!res.ok) throw new Error("Request failed");
        setUsers(await res.json());
      } catch (err) {
        console.error(err);
      }
    }
    loadUsers();
  }, []);

  const results = users.filter(user =>
    user.company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="page">
      <h1>Search Companies</h1>
      <input
        placeholder="Enter company name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {results.map(user => (
        <article className="job-card" key={user.id}>
          <h3>{user.company.name}</h3>
          <p>Contact: {user.name}</p>
          <p>Location: {user.address.city}</p>
        </article>
      ))}

      {results.length === 0 && <p>No results found.</p>}
    </section>
  );
}