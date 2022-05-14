import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

const List = ({ list, removeItem, editItem }) => {
  return (
    <section className="flex flex-col space-y-4">
      {list.map((item) => {
        const { id, title } = item;
        return (
          <article
            key={id}
            className="flex justify-between items-center bg-gray-50"
          >
            <p className="p-2 font-mono">{title}</p>
            <div className="flex text-lg space-x-4 p-2">
              <FiEdit className="text-green-700" onClick={() => editItem(id)} />
              <MdOutlineDelete
                className="text-red-700"
                onClick={() => removeItem(id)}
              />
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default List;
