import "../styles/Searchbar.css";

function Searchbar()
{
    return (
        <div className="searchbar">
            <label htmlFor="search">DEV@Deakin </label>
            <input type="text" id="search" placeholder="Search..." />
            <button type="submit">Post </button>
            <button>Login </button>
        </div>
    )
}

export default Searchbar;