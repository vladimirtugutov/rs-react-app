import React from 'react';

interface CardProps {
  id: string;
  name: string;
  description: string;
  onClick: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ id, name, description, onClick }) => {
  return (
    <tr
      key={id}
      onClick={(event) => {
        event.stopPropagation();
        onClick(id);
      }}
      className="clickable"
      data-testid="card"
    >
      <td>{name}</td>
      <td>{description}</td>
    </tr>
  );
};

export default Card;
