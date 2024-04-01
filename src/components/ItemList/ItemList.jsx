import Item from "../Item/Item";

const ItemList = ({ books }) => {
  return (
    <div className="cardContainer">
      {books?.map((book) => (
        <Item key={book.id} {...book} />
      ))}
    </div>
  );
};

export default ItemList;
