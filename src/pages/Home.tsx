import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  const [budget, setBudget] = useState(30000);
  const [priority, setPriority] = useState("balanced");
  const [brand, setBrand] = useState("all");

  function handleSearch() {

    const params = new URLSearchParams();

    params.set("budget", String(budget));
    params.set("priority", priority);

    if (brand !== "all") {
      params.set("brand", brand);
    }

    navigate(`/results?${params.toString()}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="glass-card w-full max-w-md p-6 space-y-6">

        <h1 className="text-xl font-semibold text-center">
          Sphiexia AI
        </h1>

        {/* Budget */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Budget
          </label>

          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full px-3 py-2 rounded bg-secondary"
          />
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 rounded bg-secondary"
          >
            <option value="balanced">Balanced</option>
            <option value="performance">Performance</option>
            <option value="camera">Camera</option>
            <option value="battery">Battery</option>
          </select>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Brand
          </label>

          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-3 py-2 rounded bg-secondary"
          >
            <option value="all">All</option>
            <option value="Samsung">Samsung</option>
            <option value="Google">Google</option>
            <option value="OnePlus">OnePlus</option>
            <option value="Motorola">Motorola</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="w-full py-2 rounded bg-primary text-primary-foreground"
        >
          Find Best Phone
        </button>

      </div>
    </div>
  );
}