import Aside from './Aside';
import Main from './Main';
import Nav from './Nav';
import { auth } from './../../firebase/config';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const FeedPage = () => {
  const [user, setUser] = useState(null);

  // Kullanıcı verisini al ve state'e aktar
  useEffect(() => {
    // Anlık olarak kulalnıcın oturmunu izler
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Kulanıcı home sayfasından ayrıldığında onAuthStateChanged methodunun sürekli kullanıcı oturmunu izleme olayını iptal ediyoruz (performans +)
    return () => unsub();
  }, []);

  return (
    <section className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </section>
  );
};

export default FeedPage;
