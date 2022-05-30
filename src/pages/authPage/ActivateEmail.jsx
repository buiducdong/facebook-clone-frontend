import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ActivateEmail = () => {
  const { activation_token } = useParams();
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(
            '/user/activation',
            { activation_token },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          setSuccess(res.data.msg);
          setErr('');
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);
  return (
    <div>
      <h6>{err}</h6>
      <h2>{success}</h2>
    </div>
  );
};

export default ActivateEmail;
