import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Test404Page = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
};

export default Test404Page;
