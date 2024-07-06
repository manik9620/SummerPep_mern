import { useEffect, useState } from "react";
import CategoryBar from "../components/categoryBar.js";
import Navbar from "../components/navbar.js";

const SearchPage = (props) => {
    const [products, setProducts] = useState([]);

    const { categories,setSearchtext,searchtext } = props;

    const customStyles = {
        padding: "48px",
        textAlign: "center",
        backgroundColor: "#48C7F0" ,
    };

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearchtext(val);
    };

    async function getData() {
        const response = await fetch(`http://dummyjson.com/products/search?q=${searchtext}`);
        const data = await response.json();
        setProducts(data.products);
    }
    useEffect(()=>{
        getData();
    },[searchtext])

    return (
        <div>
            <Navbar searchtext={searchtext} setSearchtext={setSearchtext}/>
            <CategoryBar categories={categories} />
            <div style={customStyles}>
                <input type="text" onChange={handleSearch} />
                <button onClick={getData}>Get data</button>
            </div>
            <h1>The searchText is: {searchtext}</h1>
            <hr/>
            
            {products.map((elem) => {
                return <p key={elem.id}>{elem.title}</p>;
            })}
        </div>
    );
};

export default SearchPage;