function VolunteersFilters({ searchTerm, setSearchTerm, location, setLocation, locations }) {
  return (
    <div className="volunteers-filters flex gap-4 items-center">
      <input 
        type="text" 
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Recherche un.e bénévole (nom ou prénom)"
      />

      <select
        className="search-filters"
        name="location"
        id="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="">-- Sélectionnez une ville --</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
}

export default VolunteersFilters;
