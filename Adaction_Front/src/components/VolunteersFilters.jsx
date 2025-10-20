function VolunteersFilters({ searchTerm, setSearchTerm, city_id, setCity_id, cities, loading }) {
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
        name="city"
        id="city"
        value={city_id}
        onChange={(e) => setCity_id(e.target.value)}
        disabled={loading}
      >
        <option value="">-- Sélectionnez une ville --</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default VolunteersFilters;
