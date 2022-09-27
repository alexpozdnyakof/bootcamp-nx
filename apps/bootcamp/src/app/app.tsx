import { Message } from '@bootcamp-nx/api-interfaces';
import { useEffect, useState } from 'react';

export default function App() {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then(r => r.json())
      .then(setMessage);
  }, []);

  return (
		<>
			<div style={{ textAlign: 'center' }}>
				<h1>Welcome to bootcamp!</h1>
				<img
					width='450'
					src='https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png'
					alt='Nx - Smart, Fast and Extensible Build System'
				/>
			</div>
			<div>{m.message}</div>
		</>
  );
}
