import { useEffect, useMemo, useState } from "react";

const MemoApiExample = () => {
  const [filter, setFilter] = useState("");
  const items = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
    { id: 4, name: "Mango" },
    // Imagine there are 1000s of items
  ];

  // Memoize the filtered list so it only recomputes when `filter` changes
  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter]); // Only re-run filter when filter state changes

  

  return (
    <div>
      <input
        type="text"
        placeholder="Search items..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemoApiExample;
