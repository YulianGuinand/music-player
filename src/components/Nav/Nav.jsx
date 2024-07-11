const Nav = ({ onChangeFunc }) => {
  return (
    <nav>
      <span>Albums</span>
      <span>Events</span>
      <span>News</span>
      <span>Contact</span>
      <input
        className="searchBar"
        placeholder="Search song"
        onChange={onChangeFunc}
      ></input>
    </nav>
  );
};

export default Nav;
