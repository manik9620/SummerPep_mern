import { RxHamburgerMenu } from "react-icons/rx";

const CategoryBar = ({ categories }) => {
    return (
        <div className="homepage-category-bar">
            <button>
                <RxHamburgerMenu />
                All
            </button>
            <div className="category-items">
                {categories.map((elem, index) => (
                    <p key={index}>{elem}</p>
                ))}
            </div>
        </div>
    );
};

export default CategoryBar;