import React, { useState, useEffect } from 'react';
import { getCharacterDetails } from './services/ApiService';
import Spinner from './Spinner';

interface DetailsProps {
  itemId: string;
  onClose: () => void;
}

interface CharacterDetails {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
}

const Details: React.FC<DetailsProps> = ({ itemId, onClose }) => {
  const [itemDetails, setItemDetails] = useState<CharacterDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: CharacterDetails = await getCharacterDetails(itemId);
        setItemDetails(data);
      } catch {
        setError('Failed to load character details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [itemId]);

  return (
    <div className="details-container">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : itemDetails ? (
        <div>
          <h2>{itemDetails.name}</h2>
          <p>
            <strong>Height:</strong> {itemDetails.height}
          </p>
          <p>
            <strong>Mass:</strong> {itemDetails.mass}
          </p>
          <p>
            <strong>Hair Color:</strong> {itemDetails.hair_color}
          </p>
          <p>
            <strong>Skin Color:</strong> {itemDetails.skin_color}
          </p>
          <p>
            <strong>Eye Color:</strong> {itemDetails.eye_color}
          </p>
        </div>
      ) : (
        <p>No details available</p>
      )}
    </div>
  );
};

export default Details;
