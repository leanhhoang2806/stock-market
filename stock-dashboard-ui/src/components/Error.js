import React,  { useEffect, useState } from 'react';
export default function NotFound() {
    const [errorDetails, setErrorDetails] = useState(null);
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const detailsParam = queryParams.get('details');
    
        if (detailsParam) {
          const decodedDetails = JSON.parse(decodeURIComponent(detailsParam));
          setErrorDetails(decodedDetails);
        }
      }, []);
    return (
        <div>
        <h1>Error Page</h1>
        {errorDetails && (
          <div>
            <p>Status: {errorDetails.status}</p>
            <p>Data: {JSON.stringify(errorDetails.data)}</p>
            {errorDetails.customizedMessage && (
            <p>{errorDetails.customizedMessage}</p>
          )}
          </div>
        )}
      </div>
    )
}
