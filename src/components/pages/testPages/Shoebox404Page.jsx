import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Shoebox404Page = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
};

export default Shoebox404Page;
