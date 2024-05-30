import moment from "moment/moment";
import Buttons from "./Buttons";
import { auth, db } from "./../../firebase/config";
import Dropdown from "./Dropdown";
import {
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useState } from "react";
import EditMode from "./EditMode";
import Content from "./Content";

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // Tarihin günümüze göre kıyasını al
  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  // Oturumu açık olan kullanıcının tweet'in likes dizisinde olup olmadığını kontrol et
  const isLiked = tweet?.likes?.includes(auth.currentUser.uid) || false;

  // Tweet'i kaldır
  const handleDelete = async () => {
    // Kaldırılacak dökümanın referansını alma
    const tweetRef = doc(db, "tweets", tweet.id);

    // Dökümanı kaldır
    deleteDoc(tweetRef)
      .then(() => toast.warn("Tweet has been removed"))
      .catch(() => toast.error("An issue occurred while deleting the Tweet!!"));
  };

  // Tweet'i beğen
  const handleLike = async () => {
    // Güncellenecek dökümanın referansını alma
    const tweetRef = doc(db, "tweets", tweet.id);

    // Belgeyi güncelle
    updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid) // Like varsa kaldır
        : arrayUnion(auth.currentUser.uid), // Like yoksa ekle
    });
  };

  return (
    <div className="border-b py-6 px-3 border-zinc-600 flex gap-3">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt={tweet.user.name}
      />

      <div className="w-full">
        {/* En üst kısım */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center whitespace-nowrap">
            <p className="font-semibold">{tweet.user.name}</p>
            <p className="text-gray-400 text-sm">
              @{tweet.user.name.toLowerCase().split(" ").join("_")}
            </p>
            <p className="text-gray-400 text-sm">{date}</p>
            {tweet.isEdited && <p className="text-gray-400 text-xs">*edited</p>}
          </div>

          {tweet.user.id === auth.currentUser.uid && (
            <Dropdown
              handleEdit={() => setIsEditMode(true)}
              handleDelete={handleDelete}
            />
          )}
        </div>

        {/* Orta kısım */}
        <div className="my-4">
          {isEditMode ? (
            <EditMode tweet={tweet} close={() => setIsEditMode(false)} />
          ) : (
            <Content tweet={tweet} />
          )}
        </div>

        {/* Alt kısım */}
        <Buttons
          isLiked={isLiked}
          handleLike={handleLike}
          likeCount={tweet.likes ? tweet.likes.length : 0}
        />
      </div>
    </div>
  );
};

export default Post;
