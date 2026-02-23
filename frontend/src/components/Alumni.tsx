import { useEffect, useState } from "react";

interface Alumni {
  _id: string;
  name: string;
  father_name?: string;
  course?: string;
  batch_year: number;
  designation?: string;
  organization?: string;
  email?: string;
  address?: string;
}

const Alumni: React.FC = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/alumni");
        const data: Alumni[] = await res.json();
        setAlumni(data);
      } catch (error) {
        console.error("Error fetching alumni:", error);
      }
    };

    fetchAlumni();
  }, []);

  const filtered = alumni.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>BCA Alumni</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />

      <div style={{ marginTop: "20px" }}>
        {filtered.map((a) => (
          <div
            key={a._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{a.name}</h3>
            <p>Batch: {a.batch_year}</p>
            {a.designation && <p>Designation: {a.designation}</p>}
            {a.organization && <p>Organization: {a.organization}</p>}
            {a.email && <p>Email: {a.email}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alumni;