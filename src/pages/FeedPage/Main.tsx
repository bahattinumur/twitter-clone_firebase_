import { useEffect, useState } from 'react';
import Form from '../../components/Form';
import Post from '../../components/Post';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Loader from '../../components/Loader';

const Main = ({ user }) => {
  const [tweets, setTweets] = useState();

  useEffect(() => {
    // Abone olunacak kollkesiyonun referansını
    const collectionRef = collection(db, 'tweets');

    // Ayarları belirle
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    // Kolleksiyondaki verileri canlı olarak al
    const unsub = onSnapshot(q, (snapshot) => {
      const tempTweets = [];

      snapshot.docs.forEach((doc) =>
        tempTweets.push({ ...doc.data(), id: doc.id })
      );

      setTweets(tempTweets);
    });

    // Kullanıcnı anasayfadan ayrıdığı zaman kolleksiyonu izlemeyi bırak
    return () => unsub();
  }, []);

  return (
    <div className="border border-zinc-600 overflow-y-auto">
      <header className="font-bold p-4 border-b border-zinc-600">
        Home
      </header>

      <Form user={user} />

      {!tweets ? (
        <Loader styles={`w-8 h-8 my-10`} />
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </div>
  );
};

export default Main;
